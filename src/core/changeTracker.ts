import { Observer } from "./observer";

class ChangeTracker {
    debug?: (target: any, prop: PropertyKey) => void;

    constructor() {
        this.runReactions = this.runReactions.bind(this);
    }

    registerChange(target: any, propKey: PropertyKey) {
        if (this.debug) {
            this.debug(target, propKey);
        }

        this.runReactions(target, propKey);
    }

    runReactions(target: any, propKey: PropertyKey) {
        for (const observer of Observer.all) {
            const reactions = observer.getReactionsForChange(target, propKey);

            if (reactions) {
                for (const reaction of reactions) {
                    reaction();
                }
            }
        }
    }
}

export const changeTracker = new ChangeTracker();