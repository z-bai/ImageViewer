import React, {useLayoutEffect, useState} from 'react';
import './index.less';
import * as images from './img';

function ImageViewer() {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    useLayoutEffect(() => {
        if (!windowWidth || !windowHeight) {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }
    });
    return (
        <div className="image_viewer"
             style={{ width: windowWidth, height: windowHeight }}
        >
            {
                Object.values(images).map((img, idx) => (
                    <div className={`pic pic${idx}`} key={idx}
                         style={{
                             backgroundImage: `url(${img})`,
                             transform: `translateX(${idx * 300}px)`
                         }}
                    >
                    </div>
                ))
            }
        </div>
    )
}

export default ImageViewer;
