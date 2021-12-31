import React, {useEffect, useRef, useState} from 'react';
import './index.less';
import * as images from './img';
import useWindowSize from "../Hooks/useWindowSize";

function ImageViewer() {
    const {windowWidth, windowHeight} = useWindowSize();
    const x = useRef(0);
    const diffX = useRef(0);
    const [diffsLatest, setDiffsLatest] = useState({});
    const diffsWhenPointerDown = useRef({});

    useEffect(() => {
        const pointerMove = (e) => {
            diffX.current = e.clientX - x.current;
            console.log(diffX.current);

            setDiffsLatest(Object.keys(images).reduce((acc, n) => Object.assign(acc, {
                [n]: (diffsWhenPointerDown.current[n] || 0) + diffX.current
            }), {}));

        };
        const pointerUp = () => {
            document.documentElement.removeEventListener('pointermove', pointerMove);
            document.documentElement.removeEventListener('pointerup', pointerUp);
        }
        const pointerDown = (e) => {
            console.log('pointer down');
            x.current = e.clientX;
            Object.assign(diffsWhenPointerDown.current, diffsLatest.current);
            document.documentElement.addEventListener('pointermove', pointerMove);
            document.documentElement.addEventListener('pointerup', pointerUp);
        };
        document.documentElement.addEventListener('pointerdown', pointerDown);
    }, []);

    return (
        <div className="image_viewer"
             style={{width: windowWidth, height: windowHeight}}
        >
            {
                Object.values(images).map((img, idx) => {
                    const diff = diffsLatest[img] || 0;
                    return (
                        <div className={`pic pic${idx}`} key={img}
                             style={{
                                 backgroundImage: `url(${img})`,
                                 transform: `translateX(${idx * windowWidth + diff}px)`
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
