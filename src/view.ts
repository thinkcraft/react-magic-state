import { wrapObserver } from "./wrapObserver";
import { addReaction } from "./addReaction";
import { unwrapObserver } from "./unwrapObserver";
import { useState, useEffect } from "react";

export function view<F extends Function>(component: F): F {
    let wrapper;

    if (component.prototype?.isReactComponent) {
        wrapper = wrapComponentClass(component);
    }
    else {
        wrapper = wrapFunctionComponent(component);
    }

    wrapper.displayName = component["displayName"] ?? component.name;

    return wrapper as any;
}

function wrapComponentClass(component: Function) {
    const baseClass = component as any;

    const wrapper = class extends baseClass {
        constructor(props) {
            super(props);

            this.state = {
                ...super.state,
                reactionCount: 0
            };


            this.increaseReactionCount = this.increaseReactionCount.bind(this);
            this.render = wrapObserver(this.render);
        }

        componentDidMount() {
            addReaction(this.render, this.increaseReactionCount);
        }

        componentWillUnmount() {
            this.render = unwrapObserver(this.render);
        }

        increaseReactionCount() {
            this.setState({ reactionCount: this.state.reactionCount + 1 });
        }
    };

    return wrapper;
}

function wrapFunctionComponent(component: Function) {
    const wrapper = wrapObserver(function (this: any) {
        const [, setState] = useState(0);

        useEffect(() => {
            addReaction(
                wrapper, 
                () => {
                    setState(s => s + 1);

                    return () => unwrapObserver(wrapper);
                }
            );
        }, []);

        return Reflect.apply(component, this, arguments);
    });

    return wrapper;
}