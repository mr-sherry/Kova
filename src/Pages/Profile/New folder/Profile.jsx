import React from "react";
import styles from "./Profile.module.css";
// import profilePic from "../assets/profile.jpg";
import QRCode from "react-qr-code";

const Profile = () => {
  const user = {
    name: "Shafqat Raza",
    gmail: "shafqat@example.com",
    points: 1500,
    streak: 12,
    referrals: 3,
    miningSessions: 25,
    createdAt: "2024-03-15",
    referralLink: "https://yourapp.com/signup?ref=shafqat1239999999999999934567890234567890",
    referralUsers: [
      { name: "Ali", points: 500, code: "ali123" },
      { name: "Ahmed", points: 300, code: "ahmed456" },
      { name: "Zain", points: 700, code: "zain789" },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <img
          src="https://i.pinimg.com/236x/fe/e3/bf/fee3bfed79484cf11eca59205fc75fb4.jpg"
          alt="Profile"
          className={styles.image}
        />
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.email}>{user.gmail}</p>

        <div className={styles.pills}>
          <span className={styles.pill}>Points: {user.points}</span>
          <span className={styles.pill}>Streak: {user.streak} days</span>
          <span className={styles.pill}>Referrals: {user.referrals}</span>
          <span className={styles.pill}>Mining: {user.miningSessions}</span>
          <span className={styles.pill}>
            Joined: {new Date(user.createdAt).toDateString()}
          </span>
        </div>

        <div className={styles.referral}>
          <h3 className={styles.sectionTitle}>Referral Link</h3>
          <p className={styles.link}>{user.referralLink}</p>
          <QRCode value={user.referralLink} size={120} />
        </div>

        {user.referralUsers.length > 0 && (
          <div className={styles.refList}>
            <h3 className={styles.sectionTitle}>My Referrals</h3>
            {user.referralUsers.map((ref, index) => (
              <div key={index} className={styles.refItem}>
                <span>{ref.name}</span>
                <span>{ref.points} pts</span>
                <span className={styles.code}>{ref.code}</span>
              </div>
            ))}
          </div>
        )}
        <button className={styles.logoutBtn}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
