import { assert } from "chai";
import { addReaction } from "../src/addReaction";
import { wrapObserver } from "../src/wrapObserver";
import { getObserver } from "../src/getObserver";

describe(`${addReaction.name}()`, function () {
    const wrappedObserver = wrapObserver(() => {});

    it("should add a reaction to the observer", function () {
        const reaction = () => { };

        addReaction(wrappedObserver, reaction);

        const observer = getObserver(wrappedObserver);

        assert.isTrue(observer.hasReaction(reaction));
    });
});