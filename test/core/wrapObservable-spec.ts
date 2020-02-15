import { assert } from "chai";
import { wrapObservable } from "../../src/core";
import { target } from "../../src/core/symbols";

describe(`${wrapObservable.name}()`, function () {
    it("should wrap the target in an observable proxy", function () {
        const proxy = wrapObservable({});

        assert.isDefined(proxy[target]);
    });

    it("if called with an observable, it should return the same object", function () {
        const target = {};
        const wrapped = wrapObservable(target);
        const wrapped2 = wrapObservable(wrapped);

        assert.equal(wrapped2, wrapped);
    });

    it("if called with a target that was already wrapped, return the original proxy", function () {
        const target = {};
        const wrapped = wrapObservable(target);
        const wrapped2 = wrapObservable(target);

        assert.equal(wrapped2, wrapped);
    });

    it("should throw if called with a primitive value", function () {
        assert.throws(() => wrapObservable(42));
        assert.throws(() => wrapObservable(41.999));
        assert.throws(() => wrapObservable("Test"));
    });
});

