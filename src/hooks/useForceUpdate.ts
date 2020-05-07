import * as React from "react";

export function useForceUpdate() {
    const [update, setUpdate] = React.useState(true);
    const forceUpdate = React.useCallback(() => setUpdate(p => !p), []);
    return forceUpdate;
}
