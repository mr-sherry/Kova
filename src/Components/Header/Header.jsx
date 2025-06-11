import React from 'react';
import styles from './Header.module.css';
import Sidebar from '../SideBar/SideBar'; // Adjust path as needed
import Icon from '../../assests/IconDark.svg'
import Text from '../../assests/TextDark.svg'


export default function Header() {
    return (
        <div className={styles.mainDivHeader}>

            <div>
                <div className={styles.logo}>
                    <img src={Icon} alt="" style={{ width: '55px' }} />
                    <img src={Text} alt="" style={{ width: '90px' }} />
                </div>
                <p className={styles.slogan}>Sync Your Efforts, Multiply Your Rewards.</p>

            </div>
            <div className={styles.header}>
                <div className={styles.left}>
                    <h2>Hello, Sherry</h2>
                    <span>Start Earning $KOVA</span>
                </div>
                <div className={styles.right}>
                    <div className={styles.points}>💰 1200 $KOVA</div>
                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
