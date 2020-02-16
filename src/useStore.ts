import { useMemo } from "react";
import { wrapObservable } from "./core";

export function useStore<T extends Object>(target: T): T {
    try {
        return useMemo(() => wrapObservable(target), []);
    }
    catch (err) {
        return wrapObservable(target);
    }    
}