import { canObserve } from "../../src/core";
import { assert } from "chai";

describe(`${canObserve.name}()`, function () {
    it("should return false for a primitive value", function () {
        assert.isFalse(canObserve(42));
    });

    it("should return false for a Date", function () {
        assert.isFalse(canObserve(new Date()));
    });

    it("should return true for an object value", function () {
        assert.isTrue(canObserve({}));
    });
});