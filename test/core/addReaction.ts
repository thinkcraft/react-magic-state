import { assert } from "chai";
import { addReaction, wrapObserver, getObserver } from "../../src/core";

describe(`${addReaction.name}()`, function () {
    const wrappedObserver = wrapObserver(() => {});

    it("should add a reaction to the observer", function () {
        const reaction = () => { };

        addReaction(wrappedObserver, reaction);

        const observer = getObserver(wrappedObserver);

        assert.isTrue(observer.hasReaction(reaction));
    });
});