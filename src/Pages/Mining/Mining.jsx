import React, { useEffect, useState } from 'react';
import styles from './Mining.module.css';
import CircularTimer from '../../Components/progress/CircularTimer';
import { NavLink, useNavigate } from 'react-router-dom';
import BtnLoader from '../../Components/Animations/BtnLoader'; // Your Lottie animation component
import Toast from '../../Components/Toast/Toast';
import { useFirebase } from '../../Context/UseFirebase';

export default function Mining() {
    const [playLottie, setPlayLottie] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const navigate = useNavigate();
    const firebase = useFirebase();
    console.log("🚀 ~ Login ~ firebasefromining:", firebase.userLogged)


    const handleClaim = () => {
        setPlayLottie(false);

        setTimeout(() => {
            setPlayLottie(true);
            setShowToast(true);
        }, 10);


        setTimeout(() => {
            setPlayLottie(false);
            setShowToast(false);
        }, 3000);
    };



    useEffect(() => {
        if (!firebase.userLogged) {
            navigate('/login')
        }

    }, [firebase.userLogged]);




    return (
        <div className={styles.appContainer}>
            {/* Daily Streak */}
            <div className={styles.streakContainer}>
                <h3>🔥 Daily Streak</h3>
                <div className={styles.streakRow}>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className={`${styles.streakDot} ${i < 3 ? styles.active : ''}`}></div>
                    ))}
                </div>
                <p>3-day streak! Keep going!</p>
            </div>

            {/* Timer and Claim Button Row */}
            <div className={styles.timerClaimRow}>
                <CircularTimer playLottie={playLottie} />

                <button
                    className={`${styles.claimButton}`}
                    onClick={handleClaim}
                    disabled={playLottie}
                >
                    <>
                        Sync Now
                        <span className={styles.coinAnimation}>🪙</span>
                    </>
                </button>
            </div>


            {/* Notification Toast */}
            <Toast show={showToast} message="✅ Claimed Successfully!" duration={2500} />

            {/* Reward Tiers */}
            <div className={styles.rewardsContainer}>
                <h3>🎁 Upcoming Rewards</h3>
                <div className={styles.reward}>
                    <span>🪙 Bronze</span>
                    <span>500 pts</span>
                </div>
                <div className={styles.reward}>
                    <span>💎 Silver</span>
                    <span>1000 pts</span>
                </div>
                <div className={styles.reward}>
                    <span>🏆 Gold</span>
                    <span>2500 pts</span>
                </div>
            </div>

            {/* Leaderboard Snapshot */}
            <section className={styles.leaderboard}>
                <h3>Leaderboard</h3>
                <ul>
                    <li>
                        <span className={styles.lbUser}>Alice</span>
                        <span className={styles.lbPoints}>250 pts</span>
                    </li>
                    <li>
                        <span className={styles.lbUser}>Bob</span>
                        <span className={styles.lbPoints}>200 pts</span>
                    </li>
                    <li>
                        <span className={styles.lbUser}>Charlie</span>
                        <span className={styles.lbPoints}>180 pts</span>
                    </li>
                </ul>
                <NavLink to={'/leaderboard'}>
                    <button className={styles.btn}>View All</button>
                </NavLink>
            </section>

            {/* Visual Enhancement: Sparkles */}
            <div className={styles.sparkle}></div>
        </div>
    );
}
