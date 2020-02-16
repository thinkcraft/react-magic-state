import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import { view } from "../src/view";
import { wrapObservable } from "../src/core";
import { spy } from "sinon";

describe(`${view.name}()`, function () {
    let wrapper: ReactWrapper | undefined;

    this.afterEach(function () {
        if (wrapper) {
            wrapper.unmount();
            wrapper = undefined;
        }
    });

    context("Class Component", function () {
        it("should re-render the view if an observed property changes", function (done) {
            const store = wrapObservable({ foo: 42 });

            wrapper = mount(<SimpleClass store={store} onUpdate={done} />);

            store.foo++;

        }).timeout(100);

        it("shouldn't re-render the view if an unobserved property changes", function (done) {
            const store = wrapObservable({ foo: 42, bar: 5 });
            const onUpdate = spy();

            wrapper = mount(<SimpleClass store={store} onUpdate={onUpdate} />);

            store.bar++;

            setTimeout(() => {
                if (onUpdate.called) {
                    done(new Error("Component was re-rendered"));
                }
                else {
                    done();
                }
            }, 50);
        });
    });

    context("Function Component", function () {
        it("should re-render the view if an observed property changes", function (done) {
            const store = wrapObservable({ foo: 42 });
            const onRender = spy();

            wrapper = mount(<SimpleFunction store={store} onRender={onRender} />);

            store.foo++;

            setTimeout(() => {
                if (onRender.calledTwice) {
                    done();
                }
                else {
                    done(new Error("Component wasn't re-rendered"));
                }
            }, 50);

        }).timeout(100);

        it("shouldn't re-render the view if an unobserved property changes", function (done) {
            const store = wrapObservable({ foo: 42, bar: 5 });
            const onRender = spy();

            wrapper = mount(<SimpleFunction store={store} onRender={onRender} />);

            store.bar++;

            setTimeout(() => {
                if (onRender.calledTwice) {
                    done(new Error("Component was re-rendered"));
                }
                else {
                    done();
                }
            }, 50);
        });
    });    
});

@view
class SimpleClass extends React.PureComponent<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.props?.onUpdate();
    }

    render() {
        const { foo } = this.props.store;

        return (
            <h1>{this.state.reactionCount}</h1>
        );
    }
}

const SimpleFunction = view(function SimpleFunction(props) {
    const { foo } = props.store;

    React.useEffect(() => {
        props?.onRender();
    });

    return (
        <h1>{foo}</h1>
    );
});