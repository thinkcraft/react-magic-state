import * as React from "react";
import { view } from "../../../../src";
import { Store } from "../state/store";

export const StoreContext = React.createContext({});

@view
export class BaseComponent<P = any, S = any, SS = any> extends React.PureComponent<P, S, SS> {
    protected get store(): Store {
        return this.context;
    }

    static contextType = StoreContext;
}
