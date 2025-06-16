import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.css';
import { useFirebase } from '../../Context/UseFirebase';

export default function Leaderboard() {
    const [topUsers, setTopUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const firebase = useFirebase();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetched = await firebase.topUsers;
                if (!fetched || !Array.isArray(fetched)) throw new Error("Invalid data");
                setTopUsers(fetched);
            } catch (err) {
                console.error("❌ Error fetching leaderboard:", err);
                setError("Failed to load leaderboard. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [firebase.topUsers]);

    if (loading) {
        return <div className={styles.leaderboardContainer}><p>Loading leaderboard...</p></div>;
    }

    if (error) {
        return <div className={styles.leaderboardContainer}><p className={styles.error}>{error}</p></div>;
    }

    return (
        <div className={styles.leaderboardContainer}>
            <div className={styles.header}>🏆 Leaderboard</div>

            <div className={styles.tabs}>
                <div className={`${styles.tab} ${styles.tabActive}`}>All Time</div>
            </div>

            <div className={styles.topThree}>
                {topUsers.slice(0, 3).map((user, i) => (
                    <div key={user.uid} className={styles.topCard}>
                        <img
                            src={
                                user.photoURL
                                    ? user.photoURL
                                    : `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${user.uid}`
                            }
                            alt={user.displayName || 'Anonymous'}
                        />
                        <div className={styles.name}>{user.displayName || 'Anonymous'}</div>
                        <div className={styles.referCode}>@{user.referCode || 'N/A'}</div>
                        <div className={styles.points}>{user.points.toFixed(2)} KP</div>
                        <div className={styles.rank}>#{i + 1}</div>
                    </div>
                ))}
            </div>


            <div className={styles.list}>
                {topUsers.slice(3).map((user, i) => (
                    <div key={user.uid} className={styles.listItem}>
                        <div className={styles.userDetails}>
                            <span className={styles.hash}>#{i + 4}</span>
                            <img
                                src={
                                    user.photoURL
                                        ? user.photoURL
                                        : `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${user.uid}`
                                }
                                alt={user.displayName || 'Anonymous'}
                            />
                            <div className={styles.userInfo}>
                                <span className={styles.name}>{user.displayName || 'Anonymous'}</span>
                                <span className={styles.username}>@{user.referCode}</span>
                            </div>
                        </div>
                        <div className={`${styles.score} ${i % 2 === 0 ? styles.up : styles.down}`}>
                            {user.points.toFixed(2)} KP
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
