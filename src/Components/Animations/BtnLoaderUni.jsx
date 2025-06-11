import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assests/LoaderWhite.json';

export default function BtnLoader({ play, height, width }) {
    const key = play ? 'play' : 'stop';

    return (
        <div style={{ width: height, height: width }}>
            {play && (
                <Lottie
                    key={key}
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                />
            )}
        </div>
    );
}



