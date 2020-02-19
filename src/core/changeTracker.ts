import { Observer } from "./observer";

class ChangeTracker {
    private _observedTargets = new WeakMap<any, Set<Observer>>();
    private _foo?: number;
    
    debug?: (target: any, prop: PropertyKey) => void;

    constructor() {
        this.resetObserved = this.resetObserved.bind(this);
        this.runReactions = this.runReactions.bind(this);
    }

    registerChange(target: any, propKey: PropertyKey) {
        if (!this._foo) {
            this._foo = setTimeout(this.resetObserved);
        }

        if (this.debug) {
            this.debug(target, propKey);
        }

        this.runReactions(target, propKey);
    }
    
    resetObserved() {
        this._observedTargets = new WeakMap();
        this._foo = undefined;
    }

    runReactions(target: any, propKey: PropertyKey) {
        for (const observer of Observer.all) {
            if (this._observedTargets.get(target)?.has(observer)) {
                continue;
            }

            const reactions = observer.getReactionsForChange(target, propKey);

            if (reactions) {
                if (!this._observedTargets.has(target)) {
                    this._observedTargets.set(target, new Set([observer]));
                }
                else {
                    this._observedTargets.get(target)?.add(observer);
                }

                for (const reaction of reactions) {
                    reaction();
                }
            }
        }
    }
}

export const changeTracker = new ChangeTracker();