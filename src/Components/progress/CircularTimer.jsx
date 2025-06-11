import React from 'react';
import styles from './CircularTimer.module.css';
import BtnLoader from '../Animations/BtnLoader'; // adjust path if needed

export default function CircularTimer({ playLottie }) {
    return (
        <div className={styles.circularProgress}>
            <svg viewBox="0 0 36 36" className={styles.circularSvg}>
                <path
                    className={styles.circleBg}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className={styles.circleProgress}
                    strokeDasharray="100, 100"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>

            <div className={styles.circularText}>
                {playLottie ? <BtnLoader play={true} /> : '24:00:00'}
            </div>
        </div>
    );
}
