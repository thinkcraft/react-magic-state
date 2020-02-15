import { spy } from "sinon";
import { assert } from "chai";
import { wrapObservable, isObservable } from "../../../src/core";

describe("Array Proxy Handler", function () {
    // const array = wrapObservable([1, 2, 3]));
    // const observer = wrapObserver(() => { for (const e of set) { } });
    // const reaction = spy();

    // observer();

    // addReaction(observer, reaction);

    it("should wrap elements", function () {
        const array = wrapObservable([{}]);
        
        array.forEach(v => {
            assert.isTrue(isObservable(v));
        });
    });
});