import { useMemo } from "react";
import { wrapObservable } from "./core";

export function useStore<T extends Object>(target: T): T {
    return useMemo(() => wrapObservable(target), []);
}