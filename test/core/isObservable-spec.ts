import { assert } from "chai";
import { isObservable, wrapObservable } from "../../src/core";

describe(`${isObservable.name}()`, function () {
    it("should return true if target is observable", function () {
        const observable = wrapObservable({});
        
        assert.isTrue(isObservable(observable));
    });

    it("should return false if target isn't observable", function () {
        assert.isFalse(isObservable({}));
    });
});