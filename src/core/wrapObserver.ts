import * as symbols from "./symbols";
import { isObserver } from "./isObserver";
import { Observer } from "./observer";

export function wrapObserver<F extends Function>(target: F): F {
    if (!(target instanceof Function)) {
        throw new Error(`target must be a function.`);
    }

    if (isObserver(target)) {
        return target;
    }

    const observer = new Observer(target);    
    const observerWrapper = observer.createWrapper() as any;

    observerWrapper[symbols.observer] = observer;

    return observerWrapper;
}
