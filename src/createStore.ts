import { useEffect } from "react";
import { wrapObservable } from "./core";
import { useStore } from "./useStore";

export function createStore<T extends Object>(target: T) {
    let isFunctionComponent = false;

    try {
        useEffect(() => {}, []);

        isFunctionComponent = true;
    }
    catch (err) {
    }

    if (isFunctionComponent) {
        throw new Error(`Attempting to use ${createStore.name}() inside a function component. Please use ${useStore.name}() instead.`);
    }

    return wrapObservable(target);
}