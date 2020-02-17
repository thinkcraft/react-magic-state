import { useState, useEffect } from "react";
import { wrapObserver, addReaction, unwrapObserver } from "./core";

export function view<F extends Function>(component: F): F {
    let wrapper;

    if (component.prototype?.isReactComponent) {
        wrapper = wrapComponentClass(component);
    }
    else {
        wrapper = wrapFunctionComponent(component);
    }

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
            if (super.componentDidMount) {
                super.componentDidMount();
            }

            addReaction(this.render, this.increaseReactionCount);
        }

        componentWillUnmount() {
            if (super.componentWillUnmount) {
                super.componentWillUnmount();
            }

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

    wrapper["displayName"] = component.name;

    return wrapper;
}