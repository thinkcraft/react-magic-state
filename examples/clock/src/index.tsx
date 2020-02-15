import * as React from "react";
import { render } from "react-dom";
import { view, useStore } from "../../../src";

const Clock = view(function Clock() {
    const store = useStore({
        date: new Date()
    });

    React.useEffect(() => {
        const interval = setInterval(
            () => {
                store.date = new Date();
            },
            1000
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>{store.date.toString()}</h1>
        </div>
    );
});

render(<Clock />, document.getElementById("app"));