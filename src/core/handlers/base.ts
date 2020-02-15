import * as symbols from "../symbols";
import { Observer } from "../observer";
import { scheduler } from "../scheduler";
import { wrapObservable } from "../wrapObservable";

export class BaseHandler {
    protected readonly _target: any;

    constructor(target: any) {
        this._target = target;
    }

    get(target: any, propKey: PropertyKey) {
        switch (propKey) {
            case symbols.observable:
                return true;
            case symbols.target:
                return target;
        }

        Observer.active?.registerAccess(this._target, propKey);

        const value = Reflect.get(target, propKey);

        if (value instanceof Object) {
            if (value instanceof Date) {
            }
            else if (value instanceof Function) {
            }
            else {
                const propDesc = Reflect.getOwnPropertyDescriptor(target, propKey);

                if (propDesc?.configurable || propDesc?.enumerable) {
                    return wrapObservable(value);
                }
            }
        }

        return value;
    }

    set(target: any, propKey: PropertyKey, value: any) {
        if (Observer.active) {
            throw new Error(`Attempting to modify property ${propKey.toString()} during observation. Please keep observer functions pure.`);
        }

        const previousValue = target[propKey];

        try {
            return Reflect.set(target, propKey, value);
        }
        finally {
            if (target == this._target && previousValue !== value) {
                scheduler.registerChange(target, propKey);
            }
        }
    }
}
