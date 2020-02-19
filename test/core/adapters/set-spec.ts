import { SetAdapter } from "../../../src/core/adapters/set";
import { wrapObservable, wrapObserver, addReaction } from "../../../src/core";

describe("SetAdapter", function () {
    it("should allow adding", function () {
        const set = wrapObservable(new SetAdapter(new Set()));
        const observer = wrapObserver(() => {
            set.size;
        });

        addReaction(observer, () => console.log(set));

        observer();

        console.log(observer);

        set.add(1);
    });
});