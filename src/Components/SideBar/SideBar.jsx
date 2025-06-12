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
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs7VY0eOygTwItzBSfWDPMdCQCEeZqNzGuHw&s"
                            alt="User Avatar"
                        />
                        <div className={styles.profileSectionInner}>
                            <h4>Sherry</h4>
                            <p>💰 1200 pts</p>
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
                            <NavLink onClick={() => setOpen(false)} className={styles.disabled}>📜 History (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)} className={styles.disabled}>🎯 Streak (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)} className={styles.disabled}>🎁 Rewards (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)}>⚙️ Settings</NavLink>
                            <NavLink onClick={() => setOpen(false)}>🏆 Leaderboard</NavLink>
                            <NavLink onClick={() => setOpen(false)}>👨‍💼 About Us</NavLink>
                            <NavLink onClick={() => setOpen(false)} className={styles.disabled}>📄 Whitepaper (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)}>⛏️ Mining Mechanism</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink onClick={() => setOpen(false)}>👨‍💼 About Us</NavLink>
                            <NavLink onClick={() => setOpen(false)} className={styles.disabled}>🏆 Leaderboard (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)} className={styles.disabled}>📄 Whitepaper (Soon)</NavLink>
                            <NavLink onClick={() => setOpen(false)}>⛏️ Mining Mechanism</NavLink>
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
