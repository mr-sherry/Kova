import React from 'react';
import styles from './Leaderboard.module.css';

const users = [
    { name: 'Alice', username: 'alice123', points: 250 },
    { name: 'Bob', username: 'bob_the_dev', points: 200 },
    { name: 'Charlie', username: 'charlie88', points: 180 },
    { name: 'Diana', username: 'diana_dev', points: 170 },
    { name: 'Ethan', username: 'ethan_code', points: 160 },
];

export default function Leaderboard() {
    return (
        <div className={styles.leaderboardContainer}>
            <div className={styles.header}>🏆 Leaderboard</div>

            <div className={styles.tabs}>
                <div className={`${styles.tab} ${styles.tabActive}`}>All Time</div>
            </div>

            <div className={styles.topThree}>
                {users.slice(0, 3).map((user, i) => (
                    <div key={i} className={styles.topCard}>
                        <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`} alt={user.name} />
                        <div className={styles.name}>{user.name}</div>
                        <div className={styles.points}>{user.points} pts</div>
                        <div className={styles.rank}>#{i + 1}</div>
                    </div>
                ))}
            </div>

            <div className={styles.list}>
                {users.slice(3).map((user, i) => (
                    <div key={i} className={styles.listItem}>
                        <div className={styles.userDetails}>
                            <span className={styles.hash}>#{i + 4}</span>
                            <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`} alt={user.name} />
                            <div className={styles.userInfo}>
                                <span className={styles.name}>{user.name}</span>
                                <span className={styles.username}>@{user.username}</span>
                            </div>
                        </div>
                        <div className={`${styles.score} ${i % 2 === 0 ? styles.up : styles.down}`}>
                            {user.points} pts
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
