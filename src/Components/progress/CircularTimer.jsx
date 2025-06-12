import React, { useEffect, useState } from 'react';
import styles from './CircularTimer.module.css';
import BtnLoader from '../Animations/BtnLoader'; // adjust path if needed
import { useFirebase } from '../../Context/UseFirebase';

export default function CircularTimer({ playLottie }) {
    const [rms, setRms] = useState(0);

    const [timeRemaining, setTimeRemaining] = useState()
    const firebase = useFirebase();


    useEffect(() => {
        if (firebase.userLogged?.uid) {
            const checkCooldown = async () => {
                if (firebase.userLogged?.uid) {
                    const ms = await firebase.getClaimCooldown(firebase.userLogged.uid);
                    setRms(ms)
                    const totalSeconds = Math.floor(ms / 1000);
                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;
                    setTimeRemaining(`${hours}h:${minutes}m:${seconds}s`)
                }
            };
            setInterval(() => {
                checkCooldown();
            }, 1000);
        }
    }, [firebase.userLogged])



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
                {playLottie ? <BtnLoader play={true} /> : (rms > 0 ? timeRemaining : 'Click Sync')}
            </div>
        </div>
    );
}
