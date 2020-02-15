import { FunctionHandler } from "./handlers/function";
import { ArrayHandler } from "./handlers/array";
import { SetHandler } from "./handlers/set";
import { MapHandler } from "./handlers/map";
import { ObjectHandler } from "./handlers/object";

export function createHandler<T extends Object>(target:T) {
    if (!(target instanceof Object)) {
        throw new Error("target must not be a primitive value.");
    }

    if (target instanceof Function) {
        return new FunctionHandler(target);
    }

    if (target instanceof Array) {
        return new ArrayHandler(target);
    }

    if (target instanceof Set) {
        return new SetHandler(target);
    }

    if (target instanceof Map) {
        return new MapHandler(target);
    }

    return new ObjectHandler(target);
}