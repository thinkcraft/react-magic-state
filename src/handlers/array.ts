import { BaseHandler } from "./base";
import { scheduler } from "../scheduler";

export class ArrayHandler extends BaseHandler {
    set(target: any, propKey: PropertyKey, value: any) {
        if (propKey === "length") {
            scheduler.registerChange(target, propKey);
        }

        return super.set(target, propKey, value);
    }
}