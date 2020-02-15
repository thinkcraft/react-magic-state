import { assert } from "chai";
import { wrapObserver } from "../src/wrapObserver";
import { wrapObservable } from "../src/wrapObservable";

describe(`${wrapObserver.name}()`, function () {
    it("should return a different function", function () {
        const target = () => { };
        const observer = wrapObserver(target);

        assert.notEqual(target, observer);
    });

    it("should call the original function", function () {
        let called = false;
        const observer = wrapObserver(() => called = true);

        observer();

        assert.isTrue(called);
    });

    it("should throw if target isn't a function", function () {
        assert.throws(() => wrapObserver({} as Function));
    });

    it("should register property access", function () {
        const store = wrapObservable({
            foo: 42
        });
        const observer = wrapObserver(() => store.foo);

        observer();
    });
});
