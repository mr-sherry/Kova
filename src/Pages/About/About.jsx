import React from "react";
import styles from "./About.module.css";
import Card from "../../Components/Cards/Card";
import pic from "../../assests/pfp.jpg";
import pic2 from "../../assests/GIgVyvqaEAAEPdd.jpg";

const About = () => {
  return (
    <div className={styles.div}>
      <h1>About Us</h1>
      <p>
        We are a passionate team of developers building KOVA—a platform where sync, innovation, and collaboration
        converge. Together, we aim to redefine mining through real-time teamwork.
      </p>

      {/* 1. Mission Statement */}
      <section className={styles.section}>
        <h3>Our Mission</h3>
        <p>
          At KOVA, our mission is to empower a decentralized community where individuals amplify rewards through
          synchronized collaboration. We are redefining mining with transparency, inclusivity, and innovation.
        </p>
      </section>

      {/* 2. Team Introduction */}
      <section className={styles.section}>
        <h3>Meet the Team</h3>
        <div className={styles.cards}>
          <Card
            name={"Shafqat"}
            backgroundImage={pic}
            facebook={"https://www.facebook.com"}
            instagram={"https://www.instagram.com"}
            twitter={"https://www.twitter.com"}
            description={"Co-Founder at KOVA"}
          />
          <Card
            name={"Ahsan"}
            backgroundImage={pic2}
            facebook={"https://www.facebook.com"}
            instagram={"https://www.instagram.com"}
            twitter={"https://www.twitter.com"}
            description={"Lead Developer"}
          />
          <Card
            name={"Zain"}
            backgroundImage={pic2}
            facebook={"https://www.facebook.com"}
            instagram={"https://www.instagram.com"}
            twitter={"https://www.twitter.com"}
            description={"Blockchain Architect"}
          />
          <Card
            name={"Sherry"}
            backgroundImage={pic}
            facebook={"https://www.facebook.com"}
            instagram={"https://www.instagram.com"}
            twitter={"https://www.twitter.com"}
            description={"Front-End Developer"}
          />
        </div>
      </section>

      {/* 4. Tech Stack */}
      <section className={styles.section}>
        <h3>Tech Stack</h3>
        <p>We use cutting-edge tools to build scalable, fast, and secure applications.</p>
        <div className={styles.techGrid}>
          <span>React.js</span>
          <span>Firebase</span>
          <span>Solana</span>
          <span>Tailwind CSS</span>
          <span>Framer Motion</span>
          <span>Node.js</span>
          <span>Firestore</span>
        </div>
      </section>

      {/* 10. Location */}
      <section className={styles.mapContainer}>
        <h3>Our Location</h3>
        <div className={styles.mapPlaceholder}>📍 Map view coming soon...</div>
      </section>
    </div>
  );
};

export default About;
