import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import Sidebar from '../SideBar/SideBar'; // Adjust path as needed
import Icon from '../../assests/IconDark.svg'
import Text from '../../assests/TextDark.svg'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../Context/UseFirebase';
import FullPageLottieLoader from '../Animations/FullPageLottieLoader';


export default function Header() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    console.log("🚀 ~ Header ~ loading:", loading)


    const firebase = useFirebase();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const uid = firebase.userLogged?.uid;
                if (!uid) {
                    console.warn("⚠️ UID not ready. Skipping fetch.");
                    setLoading(false)
                    return;
                }

                const profile = await firebase.fetchUserData(uid);
                if (profile) {
                    setUserData(profile);
                } else {
                    console.warn("⚠️ No profile data found for UID:", uid);
                    setUserData({});
                }
            } catch (error) {
                console.error("❌ Failed to fetch user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [firebase.userLogged]);





    if (loading) return <FullPageLottieLoader />;
    return (
        <div className={styles.mainDivHeader}>

            <div>
                <div className={styles.logo}>
                    <NavLink to={'/'}>

                        <img src={Icon} alt="" style={{ width: '55px' }} />
                        <img src={Text} alt="" style={{ width: '90px' }} />
                    </NavLink>
                </div>
                <p className={styles.slogan}>Sync Your Efforts, Multiply Your Rewards.</p>

            </div>
            {firebase.userLogged ? (<>
                <div className={styles.header}>
                    <div className={styles.left}>
                        <h2>Hello, {userData.displayName}</h2>
                        <span>Start Earning $KOVA</span>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.points}>💰 {userData.points} $KOVA</div>
                    </div>
                </div>


            </>) : ('')}
            <Sidebar />
        </div>
    );
}
