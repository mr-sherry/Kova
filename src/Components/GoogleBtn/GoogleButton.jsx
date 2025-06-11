import React from 'react';
import styles from './GoogleButton.module.css';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleButton({ onClick, label = "Continue with Google" }) {
    return (
        <button className={styles.googleBtn} onClick={onClick}>
            <FcGoogle className={styles.icon} />
            {label}
        </button>
    );
}
