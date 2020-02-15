import { wrapObservable } from "../src/wrapObservable";
import { wrapObserver } from "../src/wrapObserver";
import { addReaction } from "../src/addReaction";

describe("scheduler", function () {
    it("should trigger a reaction when an observed property changes", function (done) {
        const store = wrapObservable({ foo: 41 });
        const observer = wrapObserver(() => store.foo);

        addReaction(observer, done);

        observer();

        setTimeout(() => store.foo++, 0);
    });
});