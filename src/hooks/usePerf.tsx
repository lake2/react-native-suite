// create by LH (lake2@qq.com) at 2020-04-02 14:54:03
import * as React from 'react';

export function usePerf(title: string) {
    const ref = React.useRef({ fisrt: true });

    React.useEffect(() => {
        console.warn(title + " mount");

        return () => console.warn(title + " unmount");
    }, []);

    React.useEffect(() => {
        if (ref.current.fisrt) {
            ref.current.fisrt = false;
            return;
        }
        console.warn(title + " update");
    });
}
