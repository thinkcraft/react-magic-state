import * as symbols from "./symbols";

export class Observer {
    private static readonly _observerStack = new Array<Observer>();
    private static _activeObserver?: Observer;
    private static _all = new Set<Observer>();
    private _observations = new WeakMap<object, Set<PropertyKey>>();
    private readonly _reactions = new Set<Function>();
    private readonly _wrappedFunction: Function;

    static get all() {
        return this._all;
    }

    static get active() {
        return this._activeObserver;
    }

    constructor(wrappedFunction: Function) {
        this._wrappedFunction = wrappedFunction;
        
        Observer._all.add(this);
    }

    addReaction(reaction: Function) {
        this._reactions.add(reaction);
    }    

    beginObservationPhase() {        
        if (Observer._activeObserver) {
            if (Observer._activeObserver === this) {
                //TODO: Write test
                throw new Error("beginObservationPhase() called twice for the same observer.");
            }

            Observer._observerStack.push(Observer._activeObserver);
        }

        // Remove old observations
        //TODO: Write test
        this._observations = new WeakMap();

        Observer._activeObserver = this;
    }

    createWrapper() {
        const self = this;
        const target = this._wrappedFunction;
        const wrapper = function (this: any) {
            self.beginObservationPhase();

            try {
                return Reflect.apply(target, this, arguments);
            }
            finally {
                self.endObservationPhase();
            }
        };

        return wrapper;
    }
    
    destroy() {
        const wrapped = this._wrappedFunction;
        const self = this as any;

        Observer.all.delete(this);

        delete self._observations;
        delete self._reactions;
        delete self._wrappedFunction;
        delete wrapped[symbols.observer];

        return wrapped;
    }

    endObservationPhase() {
        if (Observer._activeObserver !== this) {
            throw new Error("Unmatched beingObservationPhase()/endObservationPhase() calls.");
        }

        Observer._activeObserver = Observer._observerStack.pop();
    }

    getReactionsForChange(target: any, propKeys: Set<PropertyKey>) {
        const observation = this._observations.get(target);

        if (observation) {
            for (const propKey of propKeys) {
                if (observation.has(propKey)) {
                    return this._reactions;
                }
            }
        }

        return null;
    }

    hasReaction(reaction: Function) {
        return this._reactions.has(reaction);
    }

    registerAccess(target: any, propKey: PropertyKey) {
        if (!this._observations.has(target)) {
            this._observations.set(target, new Set());
        }

        this._observations.get(target)!.add(propKey);
    }
}
