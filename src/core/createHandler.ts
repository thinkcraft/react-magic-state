import { ArrayHandler } from "./handlers/array";
import { SetHandler } from "./handlers/set";
import { MapHandler } from "./handlers/map";
import { ObjectHandler } from "./handlers/object";
import { canObserve } from "./canObserve";

export function createHandler<T extends Object>(target:T) {
    if (!canObserve(target)) {
        throw new Error("target type is not supported.");
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