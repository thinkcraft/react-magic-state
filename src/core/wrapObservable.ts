import { createHandler } from "./createHandler";
import { proxyMap } from "./globals";
import { isObservable } from "./isObservable";

export function wrapObservable<T extends Object>(target: T): T {
    if (isObservable(target)) {
        return target;
    }

    let proxy = proxyMap.get(target);

    if (proxy) {
        return proxy;
    }

    proxy = new Proxy(target, createHandler(target));

    proxyMap.set(target, proxy);

    return proxy;
}