import { BaseHandler } from "./base";
import * as symbols from "../symbols";

export class FunctionHandler extends BaseHandler {
    constructor(target: any) {
        super(target);
    }

    apply(target, thisArg, argumentList) {
        try {
            return Reflect.apply(target, thisArg, argumentList);
        }
        catch (err) {
            if (err.message.indexOf("incompatible") >= 0) {
                thisArg = thisArg[symbols.target];

                return Reflect.apply(target, thisArg, argumentList);                
            }

            throw err;
        }
    }
}