import { BaseHandler } from "./base";
import { scheduler } from "../scheduler";

export class SetHandler extends BaseHandler {
    private readonly _methodWrappers = new WeakMap<Function, Function>();

    constructor(target: any) {
        super(target);
    }

    get(target: any, propKey: PropertyKey) {
        const value = super.get(target, propKey);

        if (value instanceof Function) {
            return this._wrap(value);
        }

        return value;
    }

    private _wrap(target: Function) {
        if (this._methodWrappers.has(target)) {
            return this._methodWrappers.get(target);
        }

        const set = this._target;
        const wrapper = function () {
            const beforeSize = set.size;

            try {
                return Reflect.apply(target, set, arguments);
            }
            finally {
                if (beforeSize !== set.size) {
                    scheduler.registerChange(set, "size");
                    scheduler.registerChange(set, Symbol.iterator);
                }
            }
        };

        this._methodWrappers.set(target, wrapper);

        return wrapper;
    }
}