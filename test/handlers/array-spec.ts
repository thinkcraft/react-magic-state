import { wrapObservable } from "../../src/wrapObservable";
import { wrapObserver } from "../../src/wrapObserver";
import { spy } from "sinon";
import { addReaction } from "../../src/addReaction";
import { assert } from "chai";
import { isObservable } from "../../src/isObservable";

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