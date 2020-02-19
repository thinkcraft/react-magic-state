import { BaseHandler } from "./base";
import { changeTracker } from "../changeTracker";

export class ArrayHandler extends BaseHandler {
    set(target: any, propKey: PropertyKey, value: any, receiver: any) {
        if (propKey === "length") {
            changeTracker.registerChange(target, propKey);
        }

        return super.set(target, propKey, value, receiver);
    }
}