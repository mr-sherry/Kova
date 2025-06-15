import React from 'react';
import styles from './Whitepaper.module.css';

export default function Whitepaper() {
    return (
        <div className={styles.whitepaperContainer}>
            <h1 className={styles.mainHeading}>KOVA Whitepaper</h1>

            <section className={styles.section}>
                <h2 className={styles.subHeading}>Mining Mechanism – Proof of Sync (PoSync)</h2>
                <p>
                    KOVA introduces a collaborative mining protocol called Proof of Sync (PoSync), where users earn rewards by
                    synchronizing their mining or claim actions in real time. When at least 3 users trigger their sync within a
                    5-second window, each receives a reward multiplier (ranging from 3x to 5x).
                </p>
            </section>

            <section className={styles.section}>
                <h3 className={styles.subSubHeading}>Mining Rules</h3>
                <ul className={styles.list}>
                    <li>Only 1 sync per hour is allowed per device.</li>
                    <li>All actions are timestamped and verified server-side to ensure synchronization validity.</li>
                    <li>Device fingerprinting and IP validation are used to prevent abuse and multi-accounting.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h3 className={styles.subSubHeading}>Halving Schedule</h3>
                <p>
                    KOVA's pre-mainnet mining starts with 1,000,000 tokens distributed per day. The reward rate undergoes halving
                    every 3 months, ensuring a deflationary emission curve. This continues through a 12-month pre-mainnet period.
                </p>
            </section>

            <section className={styles.section}>
                <h3 className={styles.subSubHeading}>Anti-Abuse Protections</h3>
                <ul className={styles.list}>
                    <li>1 sync per hour/device limit.</li>
                    <li>Device fingerprinting and unique session verification.</li>
                    <li>Real-time timestamp validation on the backend to ensure fairness.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h3 className={styles.subSubHeading}>Strategic Features (Planned)</h3>
                <ul className={styles.list}>
                    <li><strong>Sync Raids:</strong> Organized large-scale sync events with higher multipliers.</li>
                    <li><strong>NFT Boosters:</strong> Special NFTs that enhance mining power or reduce cooldowns.</li>
                    <li><strong>Analytics Dashboard:</strong> Real-time visual insights into sync efficiency, rewards, and referral performance.</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h3 className={styles.subSubHeading}>Tokenomics</h3>
                <ul className={styles.list}>
                    <li>Total Supply: 1,000,000,000 KOVA tokens</li>
                    <li>Pre-Mainnet Mining: 30% (300M)</li>
                    <li>Post-Mainnet Mining: 15% (150M)</li>
                    <li>Community Allocation: 20%</li>
                    <li>Team Allocation: 15%</li>
                    <li>Partnerships: 10%</li>
                    <li>Liquidity Provision: 5%</li>
                    <li>DAO Treasury: 5%</li>
                </ul>
            </section>
        </div>
    );
}