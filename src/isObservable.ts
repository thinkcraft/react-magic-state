import { observable } from "./symbols";

export function isObservable(target: any): boolean {
    return target[observable] === true;
}