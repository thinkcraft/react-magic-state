import { getObserver } from "./getObserver";

export function unwrapObserver<F extends Function>(target: F) {
    const observer = getObserver(target);

    if (!observer) {
        return target;
    }

    return observer.destroy();
}