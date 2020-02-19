import * as symbols from "../symbols";
import { Observer } from "../observer";
import { changeTracker } from "../changeTracker";
import { wrapObservable } from "../wrapObservable";
import { canObserve } from "../canObserve";

export class BaseHandler {
    protected readonly _target: any;

    constructor(target: any) {
        this._target = target;
    }

    get(target: any, propKey: PropertyKey, receiver: any) {
        switch (propKey) {
            case symbols.observable:
                return true;
            case symbols.target:
                return target;
        }

        Observer.active?.registerAccess(this._target, propKey);

        const value = Reflect.get(target, propKey, receiver);

        if (canObserve(value)) {
            const propDesc = Reflect.getOwnPropertyDescriptor(target, propKey);

            if (propDesc?.configurable || propDesc?.enumerable) {
                return wrapObservable(value);
            }
        }

        return value;
    }

    set(target: any, propKey: PropertyKey, value: any, receiver: any) {
        if (Observer.active) {
            throw new Error(`Attempting to modify property ${propKey.toString()} during observation. Please keep observer functions pure.`);
        }

        const previousValue = target[propKey];

        try {
            return Reflect.set(target, propKey, value, receiver);
        }
        finally {
            if (target == this._target && previousValue !== value) {
                changeTracker.registerChange(target, propKey);
            }
        }
    }
}
