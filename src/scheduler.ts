import { Observer } from "./observer";

class Scheduler {
    private _scheduledRun?: number;
    private readonly _scheduledChanges = new Map<Object, Set<PropertyKey>>();

    batchUpdates = false;
    debug?: (target: any, prop: PropertyKey) => void;

    constructor() {
        this.runReactions = this.runReactions.bind(this);
    }    

    registerChange(target: any, propKey: PropertyKey) {
        if (!this._scheduledChanges.has(target)) {
            this._scheduledChanges.set(target, new Set());
        }

        this._scheduledChanges.get(target)!.add(propKey);

        if (this.debug) {
            this.debug(target, propKey);
        }

        if (this.batchUpdates) {
            if (!this._scheduledRun) {
                this._scheduledRun = setTimeout(this.runReactions);
            }
        }
        else {
            this.runReactions();
        }
    }

    runReactions() {
        if (this._scheduledRun) {
            clearTimeout(this._scheduledRun);
            
            this._scheduledRun = undefined;
        }

        const reactionsToRun = new Array<Function>();
        const observers = new Set(Observer.all);

        try {
            for (const change of this._scheduledChanges) {
                for (const observer of observers) {
                    const reactions = observer.getReactionsForChange(change[0], change[1]);

                    if (reactions) {
                        reactionsToRun.push(...reactions);
                        // Observer's reactions are already scheduled to run, no need to keep checking it
                        observers.delete(observer);
                    }
                }
            }
        }
        finally {
            this._scheduledChanges.clear();
        }

        for (const reaction of reactionsToRun) {
            reaction();
        }
    }
}

export const scheduler = new Scheduler();