import React, { useEffect, useState } from 'react';
import GoogleButton from '../../Components/GoogleBtn/GoogleButton';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useFirebase } from '../../Context/UseFirebase';
import BtnLoader from '../../Components/Animations/BtnLoaderUni';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const firebase = useFirebase();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            alert("All fields are required!");
            return;
        }
        setLoading(true)
        try {
            const loginresult = await firebase.login(email, password);
            console.log("🚀 ~ handleSubmit ~ loginresult:", loginresult);
            // Optionally handle login success state here
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        } finally {
            setEmail('');
            setPassword('');
            setLoading(false)
        }
    };

    const handleLoginWithGoogle = async () => {

        await firebase.signInWithGoogle();

    }


    useEffect(() => {
        if (firebase.userLogged) {
            navigate('/')
        }


    }, [firebase.userLogged])



    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Login</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className={styles.input} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className={styles.input} />
                <button type="submit" className={styles.submitBtn}>
                    {loading ? <BtnLoader play={loading} height={'20px'} width={'20px'} /> : 'Login'}
                </button>
            </form>

            <div className={styles.orSeparator}>or</div>
            <GoogleButton label="Sign in with Google" onClick={handleLoginWithGoogle} />

            <p className={styles.linkText}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
}
