import React, { useState } from 'react';
import styles from './Settings.module.css';

const Settings = () => {
    const [displayName, setDisplayName] = useState("Sherry");
    const [email, setEmail] = useState("sherry@example.com");
    const [password, setPassword] = useState("");
    const [theme, setTheme] = useState("system");
    const [profilePic, setProfilePic] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) setProfilePic(URL.createObjectURL(file));
    };

    return (
        <>
            <div className={styles.settingsContainer}>
                {/* Theme */}
                <div className={styles.settingItem1Main}>
                    <h1>Settings</h1>
                    <div className={styles.settingItem1} >
                        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System</option>
                        </select>
                    </div >
                </div>

                {/* Profile Picture */}
                {/* <div className={styles.settingItem}>
                    <label>Profile Picture:</label>
                    <div className={styles.profilePicWrapper}>
                        <img
                            src={profilePic || "https://api.dicebear.com/7.x/adventurer/svg"}
                            alt="Profile"
                            className={styles.profilePic}
                        />
                        <input type="file" onChange={handleProfilePicChange} />
                    </div>
                </div> */}

                {/* Display Name */}
                <div className={styles.settingItem}>
                    <label>Display Name:</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className={styles.settingItem}>
                    <label>Email Address:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className={styles.settingItem}>
                    <label>New Password:</label>
                    <input
                        type="password"
                        placeholder="Change Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={styles.btnDiv}>

                    <button className={styles.updateBtn}>Update</button>
                </div>

                {/* Connected Accounts */}
                <div className={styles.settingItem}>
                    <label>Connected Accounts:</label>
                    <div className={styles.socials}>
                        <button className={styles.socialBtn}>🔗 Google</button>
                        <button className={styles.socialBtn}>🔗 Twitter</button>
                    </div>
                </div>



                {/* Session History */}
                <div className={styles.settingItem}>
                    <label>Session History:</label>
                    <p>Last login: 2 hours ago (Chrome, Windows)</p>
                    <button className={styles.outlineBtn}>Logout from All Devices</button>
                </div>

                {/* Danger Zone */}
                <div className={styles.dangerZone}>
                    <h3>Danger Zone</h3>
                    <button
                        className={styles.deleteBtn}
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        Delete My Account
                    </button>
                    {showDeleteConfirm && (
                        <div className={styles.confirmBox}>
                            <p>Are you sure you want to delete your account? This action is irreversible.</p>
                            <button className={styles.confirmBtn}>Yes, Delete</button>
                            <button className={styles.cancelBtn} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Settings;
