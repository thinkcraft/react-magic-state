import { assert } from "chai";
import { wrapObserver } from "../src/wrapObserver";
import { isObserver } from "../src/isObserver";

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