import { spy } from "sinon";
import { assert } from "chai";
import { wrapObservable, wrapObserver, addReaction, isObservable } from "../../../src/core";


describe("Set Proxy Handler", function () {
    const set = wrapObservable(new Set([1, 2, 3]));
    const observer = wrapObserver(() => { for (const e of set) { } });
    const reaction = spy();

    observer();

    addReaction(observer, reaction);

    this.beforeEach(function () {
        reaction.resetHistory();
    });

    it.skip("should return wrapped items", function () {
        const set = wrapObservable(new Set([{}]));
        
        set.forEach(v => {
            assert.isTrue(isObservable(v));
        });
    });

    it("should trigger reaction on add", function () {
        set.add(4);

        assert.isTrue(reaction.calledOnce);
    });

    it("shouldn't trigger reaction on forEach", function () {
        set.forEach(v => {});

        assert.isFalse(reaction.called);
    });

    it("should trigger reaction on delete", function () {
        set.delete(3);

        assert.isTrue(reaction.calledOnce);
    });

    it("should trigger reaction on clear", function () {
        set.clear();

        assert.isTrue(reaction.calledOnce);
    });
});