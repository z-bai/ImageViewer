import {useLayoutEffect, useState} from "react";

export default function useWindowSize() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useLayoutEffect(() => {
        if (!windowWidth || !windowHeight) {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }
    }, [windowWidth, windowHeight]);

    return { windowWidth, windowHeight };
}

