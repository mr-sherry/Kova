import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import styles from './Profile.module.css';
import IconDark from '../../assests/IconDark.svg';

export default function Profile({ onLogout }) {
    const [fetchData, setFetchData] = useState(null);
    const [error, setError] = useState(null);
    const qrRef = useRef(null);

    const referralLink = fetchData ? `https://kova-mining.com/ref/${fetchData.referralCode}` : '';

    const qrCode = new QRCodeStyling({
        width: 140,
        height: 140,
        data: referralLink,
        image: IconDark,
        dotsOptions: {
            gradient: {
                type: 'linear',
                rotation: 90,
                colorStops: [
                    { offset: 0, color: 'black' },
                    { offset: 1, color: '#7a7a7a' }
                ]
            },
            type: 'dots',
        },
        backgroundOptions: {
            color: '#ffffff',
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            margin: 6,
        },
    });

    useEffect(() => {
        try {
            const dummyData = {
                profilePic: 'https://api.dicebear.com/7.x/fun-emoji/svg?seed=profile',
                name: 'Sherry Ahmed',
                email: 'sherry@gmail.com',
                points: 1240,
                streak: 7,
                referrals: [
                    { name: 'Ali Raza', points: 150 },
                    { name: 'Zoya Malik', points: 90 },
                ],
                sessions: [
                    { date: '2025-06-14', points: 100 },
                    { date: '2025-06-13', points: 80 },
                ],
                createdAt: '2025-05-01',
                referralCode: 'sherry123',
            };
            setFetchData(dummyData);
        } catch (err) {
            setError('Failed to load profile data.');
        }
    }, []);

    useEffect(() => {
        if (fetchData && qrRef.current) {
            qrCode.update({ data: referralLink });
            qrRef.current.innerHTML = '';
            qrCode.append(qrRef.current);
        }
    }, [fetchData]);

    if (error) return <div className={styles.error}>⚠️ {error}</div>;
    if (!fetchData) return <div className={styles.loader}>Loading profile...</div>;

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.mainDivHeader}>
                <div className={styles.profileTopRowCentered}>
                    <div className={styles.userBoxColumn}>
                        <img src={fetchData.profilePic} className={styles.profilePic} alt="Profile" />
                        <h2 className={styles.profileName}>{fetchData.name}</h2>
                    </div>
                    <div className={styles.qrBox}>
                        <div className={styles.qrContainer} ref={qrRef} />
                    </div>
                </div>

                <div className={styles.centeredContent}>
                    <div className={styles.shortPill}>👥 {fetchData.referrals.length} Referrals</div>

                    <div className={styles.statsRowCentered}>
                        <div className={styles.pillSmall}>⭐ {fetchData.points} KP</div>
                        <div className={styles.pillSmall}>🔥 {fetchData.streak}-day Streak</div>
                        <div className={styles.pillSmall}>📅 Joined: {fetchData.createdAt}</div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>📲 Referral Link</h3>
                    <p className={styles.referralText}>{referralLink}</p>
                </div>

                <div className={styles.section}>
                    <h3>👥 Your Referrals</h3>
                    <div className={styles.referralListCenteredSmall}>
                        {fetchData.referrals.map((ref, i) => (
                            <div key={i} className={styles.referralCardSmall}>
                                <span className={styles.refName}>{ref.name}</span>
                                <span className={styles.refPoints}>{ref.points} pts</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>⛏️ Mining History</h3>
                    <div className={styles.referralListCenteredSmall}>
                        {fetchData.sessions.map((s, i) => (
                            <div key={i} className={styles.miningCardSmall}>
                                <span>{s.date}</span>
                                <span>{s.points} pts</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.centeredContent}>
                    <button className={styles.logoutBtn} onClick={onLogout}>🚪 Logout</button>
                </div>
            </div>
        </div>
    );
}
