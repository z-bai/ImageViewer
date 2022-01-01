import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import * as images from './img';
import useForceUpdate from "use-force-update";

const html = document.documentElement;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
function ImageViewer() {
    const forceUpdate = useForceUpdate();
    const x = useRef(0);
    const t = useRef({});
    const offsetXRef = useRef(0);
    const [animEnabled, setAnimEnabled] = useState(false);

    useEffect(() => {
        const updateOffset = (v) => {
            let limitV = Math.min(0, v);
            limitV = Math.max(
              limitV,
              (Object.keys(images).length-1) * windowWidth * -1);
            offsetXRef.current = limitV;
            forceUpdate();
        };
        const getShapeFunc = (elapsed, direction) => {
            if (elapsed > 300) {
                return Math.round;
            }
            if (direction === 'left') {
                return Math.floor;
            }
            return Math.ceil;
        };
        const pointerMove = (e) => {
            const diffX = e.clientX - x.current;
            x.current = e.clientX;
            updateOffset(offsetXRef.current + diffX);
        };
        const pointerUp = (e) => {
            html.removeEventListener('pointermove', pointerMove);
            html.removeEventListener('pointerup', pointerUp);

            setAnimEnabled(true);
            const offsetX = offsetXRef.current;
            const elapsed = Date.now() - t.current.time;
            const direction = e.clientX < t.current.startX ? 'left' : 'right';
            const shapeFunc = getShapeFunc(elapsed, direction);

            updateOffset(windowWidth * shapeFunc(offsetX / windowWidth));
        };
        const pointerDown = (e) => {
            x.current = e.clientX;
            t.current = {
                time: Date.now(),
                startX: e.clientX
            };
            setAnimEnabled(false);
            html.addEventListener('pointermove', pointerMove);
            html.addEventListener('pointerup', pointerUp);
        };
        html.addEventListener('pointerdown', pointerDown);
        return () => {
            html.removeEventListener('pointerdown', pointerDown);
        }
    }, [forceUpdate]);


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
