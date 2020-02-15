import * as React from "react";
import { mount } from "enzyme";
import { view } from "../src/view";
import { wrapObservable } from "../src/core";

describe(`${view.name}()`, function () {
    it.skip("should work", function () {
        const store = wrapObservable({ foo: 42 });

        const wrapper = mount(<Simple store={store} />);

        for (let i = 0; i < 1000; i++) {
            store.foo++;
        }

        setTimeout(
            () => {
                wrapper.unmount();
                store.foo++;
            },
            10
        );
    });
});

@view
class Simple extends React.Component<any, any> {
    render() {
        const { foo } = this.props.store;

        return (
            <h1>{this.state.reactionCount}</h1>
        );
    }
}