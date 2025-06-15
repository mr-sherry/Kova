import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../../Context/UseFirebase';

export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const firebase = useFirebase()

    const handleLogout = () => {
        firebase.logout()
        setOpen(false)
    }



    return (
        <>
            <div className={styles.hamburger} onClick={() => setOpen(true)}>
                <FiMenu size={24} />
            </div>

            <div className={`${styles.sidebar} ${open ? styles.open : ''}`}>
                <div className={styles.closeIcon} onClick={() => setOpen(false)}>
                    <FiX size={24} />
                </div>

                {/* Profile Section */}
                <div className={styles.profileSection}>
                    {firebase.userLogged ? (<>
                        <img
                            className={styles.avatar}
                            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${firebase.fetchedData ? firebase.fetchedData.displayName : ''}`}
                            alt="User Avatar"
                        />
                        <div className={styles.profileSectionInner}>
                            <h4>{firebase.fetchedData ? firebase.fetchedData.displayName : ''}</h4>
                            <p>💰 {firebase.fetchedData ? firebase.fetchedData.points : ''} pts</p>
                            <NavLink className={styles.profile} onClick={() => setOpen(false)} to={'/profile'}>👨‍💼 Profile</NavLink>

                        </div>


                    </>) : (
                        <div>Login Or Register First</div>
                    )}
                </div>




                {/* Navigation */}
                <nav className={styles.nav}>
                    {firebase.userLogged ? (
                        <>
                            <NavLink onClick={() => setOpen(false)} to="/">🏠 Home</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/'} className={styles.disabled}>📜 History (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/'} className={styles.disabled}>🎯 Streak (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/'} className={styles.disabled}>🎁 Rewards (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/'}>⚙️ Settings</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/leaderboard'}>🏆 Leaderboard</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/about'}>👨‍💼 About Us</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/white-paper'} >📄 Whitepaper</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink onClick={() => setOpen(false)} to={'/'}>👨‍💼 About Us</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/'} className={styles.disabled}>🏆 Leaderboard (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)} to={'/white-paper'} >📄 Whitepaper (Soon)</NavLink>
                        </>
                    )}
                </nav>

                <div className={styles.authBtnDiv}>
                    {firebase.userLogged ?
                        (<NavLink to={'/login'}>

                            <button className={styles.authBtn} onClick={handleLogout}>Logout</button>
                        </NavLink>) : (<>
                            <NavLink to={'/login'}>

                                <button className={styles.authBtn}>Login</button>
                            </NavLink>
                            <NavLink to={'/register'}>

                                <button className={styles.authBtn}>Register</button>
                            </NavLink>
                        </>)
                    }


                </div>
            </div>


            {/* Optional overlay */}
            {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
        </>
    );
}
