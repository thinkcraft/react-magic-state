import { observer } from "./symbols";
import { Observer } from "./observer";

export function getObserver(target: Function) {
    return target[observer] as Observer;
}