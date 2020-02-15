import { getObserver } from "./getObserver";


export function addReaction(target: Function, reaction: Function) {
    const observer = getObserver(target);

    if (!observer) {
        throw new Error("target must be an observer function.");
    }

    observer.addReaction(reaction);
}
