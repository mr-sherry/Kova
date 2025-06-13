import React, { useEffect, useState } from 'react';
import styles from './Mining.module.css';
import CircularTimer from '../../Components/progress/CircularTimer';
import { NavLink, useNavigate } from 'react-router-dom';
import Toast from '../../Components/Toast/Toast';
import { useFirebase } from '../../Context/UseFirebase';
import FullPageLottieLoader from '../../Components/Animations/FullPageLottieLoader';


export default function Mining() {
    const [playLottie, setPlayLottie] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [fetchedData, setFetchedData] = useState(null)



    const navigate = useNavigate();
    const firebase = useFirebase();
    // console.log("🚀 ~ Login ~ firebasefromining:", firebase.userLogged)


    const handleClaim = async () => {
        // Start Lottie animation
        setPlayLottie(true);
        setShowToast(false); // Hide toast in case it's already visible
        try {
            if (firebase.userLogged?.uid) {
                await firebase.updateClaimedTime(firebase.userLogged.uid);
                const claimed = await firebase.getClaimCooldown(firebase.userLogged.uid);
                console.log("🚀 ~ handleClaim ~ claimed:", claimed)

                // Wait for the claimed time to successfully update
                setShowToast(true); // Show success toast
            } else {
                console.warn("User not logged in");
            }
        } catch (error) {
            console.error("Failed to update claimedTime:", error);
            // Optionally show an error toast
        } finally {
            // Stop Lottie after a short duration
            setPlayLottie(false);
        }
    };




    useEffect(() => {
        if (!firebase.userLogged) {
            navigate('/login')
        } if (firebase.userLogged?.uid) {
            const checkCooldown = async () => {
                if (firebase.userLogged?.uid) {
                    const ms = await firebase.getClaimCooldown(firebase.userLogged.uid);
                    setTimeRemaining(ms)
                }
            };
            setInterval(() => {
                checkCooldown();
            }, 1000);

        }

    }, [firebase.userLogged]);


    useEffect(() => {
        const gettingData = async () => {
            const data = await firebase.fetchUserData(firebase.userLogged.uid)
            setFetchedData(data)
        }
        gettingData();

    }, [firebase.userLogged, showToast]);

    if (!fetchedData) return <FullPageLottieLoader />

    return (
        <div className={styles.appContainer}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <h2>Hello, {fetchedData.displayName}</h2>
                    <span>Start Earning $KOVA</span>
                </div>
                <div className={styles.right}>
                    <div className={styles.points}>💰 {fetchedData.points} $KOVA</div>
                </div>
            </div>
            {/* Daily Streak */}
            <div className={styles.streakContainer}>
                <h3>🔥 Daily Streak</h3>
                <div className={styles.streakRow}>
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className={`${styles.streakDot} ${i < fetchedData.streak ? styles.active : ''}`}></div>
                    ))}
                </div>
                <p>{fetchedData.streak}-day streak! Keep going!</p>
            </div>

            {/* Timer and Claim Button Row */}
            <div className={styles.timerClaimRow}>
                <CircularTimer playLottie={playLottie} />

                <button
                    className={`${styles.claimButton}`}
                    onClick={handleClaim}
                    disabled={timeRemaining > 0}
                >
                    <>
                        {timeRemaining > 0 ? 'Wait For Timer...' : 'Sync Now'}
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
