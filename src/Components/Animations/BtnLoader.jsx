import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assests/LoaderDark.json';

export default function BtnLoader({ play }) {
    const key = play ? 'play' : 'stop';

    return (
        <div style={{ width: 80, height: 80 }}>
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



