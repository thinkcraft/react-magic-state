import { Observer } from "./observer";
import { getObserver } from "./getObserver";

export function isObserver(target: Function) {
    return getObserver(target) instanceof Observer;
}