// Components/Toast.jsx
import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export default function Toast({ show, message = "✅ Success", duration = 2500 }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setVisible(true); // trigger slide-in
            const timer = setTimeout(() => {
                setVisible(false); // trigger slide-out
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration]);

    return (
        <div
            className={`${styles.toast} ${visible ? styles.toastIn : styles.toastOut}`}
        >
            {message}
        </div>
    );
}
