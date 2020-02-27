import { unstable_batchedUpdates } from "react-dom";

export function batch(func: () => any) {
    unstable_batchedUpdates(func);
}