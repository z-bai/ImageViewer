import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import * as images from './img';
import useWindowSize from "../Hooks/useWindowSize";
import useForceUpdate from "use-force-update";

const html = document.documentElement;
function ImageViewer() {
    const {windowWidth, windowHeight} = useWindowSize();
    const forceUpdate = useForceUpdate();
    const x = useRef(0);
    const offsetXRef = useRef(0);
    const [animEnabled, setAnimEnabled] = useState(false);

    useEffect(() => {
        const updateOffset = (v) => {
            offsetXRef.current = v;
            forceUpdate();
        };
        const pointerMove = (e) => {
            const diffX = e.clientX - x.current;
            x.current = e.clientX;
            updateOffset(offsetXRef.current + diffX);
        };
        const pointerUp = () => {
            html.removeEventListener('pointermove', pointerMove);
            html.removeEventListener('pointerup', pointerUp);

            setAnimEnabled(true);
            const offsetX = offsetXRef.current;
            updateOffset(windowWidth * Math.round(offsetX / windowWidth));
        };
        const pointerDown = (e) => {
            x.current = e.clientX;
            setAnimEnabled(false);
            html.addEventListener('pointermove', pointerMove);
            html.addEventListener('pointerup', pointerUp);
        };
        html.addEventListener('pointerdown', pointerDown);
        return () => {
            html.removeEventListener('pointerdown', pointerDown);
        }
    }, [forceUpdate, windowWidth]);


    const animClass = animEnabled ? 'anim' : '';
    const offsetX = offsetXRef.current;
    return (
        <div className="image_viewer"
             style={{width: windowWidth, height: windowHeight}}
        >
            {
                Object.keys(images).map((name, idx) => {
                    const img = images[name];
                    return (
                        <div className={`pic pic${idx} ${animClass}`} key={img}
                             style={{
                                 backgroundImage: `url(${img})`,
                                 transform: `translateX(${idx * windowWidth + offsetX}px)`
                             }}
                        >
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ImageViewer;
