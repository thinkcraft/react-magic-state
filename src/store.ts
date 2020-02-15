import { wrapObservable } from "./wrapObservable";
import { useEffect } from "react";
import { useStore } from "./useStore";

export function store<T extends Object>(target: T) {
    let isFunctionComponent = false;

    try {
        useEffect(() => {}, []);

        isFunctionComponent = true;
    }
    catch (err) {
    }

    if (isFunctionComponent) {
        throw new Error(`Attempting to use ${store.name}() inside a function component. Please use ${useStore.name}() instead.`);
    }

    return wrapObservable(target);
}