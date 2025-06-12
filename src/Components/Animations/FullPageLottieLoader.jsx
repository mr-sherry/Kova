// components/FullPageLottieLoader.jsx
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assests/LoaderDark.json";
import styles from "./FullPageLottieLoader.module.css";

const FullPageLottieLoader = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.lottieWrapper}>
                <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    );
};

export default FullPageLottieLoader;
