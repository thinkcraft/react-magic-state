import { useEffect } from "react";
import { wrapObservable } from "./core";
import { useStore } from "./useStore";

export function createStore<T extends Object>(target: T) {
    try {
        useEffect(() => {}, []);

        throw new Error(`Attempting to use ${createStore.name}() inside a function component. Please use ${useStore.name}() instead.`);
    }
    catch (err) {
    }

    return wrapObservable(target);
}