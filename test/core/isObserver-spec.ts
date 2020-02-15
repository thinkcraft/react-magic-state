import { assert } from "chai";
import { isObserver, wrapObserver } from "../../src/core";

describe(`${isObserver.name}()`, function () {
    it("should return true if function is observer", function () {
        const observer = wrapObserver(() => {});

        assert.isTrue(isObserver(observer));
    });

    it("should return false if function is not an observer", function () {
        const func = () => {};

        assert.isFalse(isObserver(func));
    });
});