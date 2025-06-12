import React, { useEffect, useState } from 'react';
import GoogleButton from '../../Components/GoogleBtn/GoogleButton';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import { useFirebase } from '../../Context/UseFirebase';
import BtnLoader from '../../Components/Animations/BtnLoaderUni';


export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const firebase = useFirebase()



    const handleClick = async (e) => {
        e.preventDefault();

        if (!username.trim() || !email.trim() || !password.trim()) {
            alert("All fields are required!");
            return;
        }
        setLoading(true)

        try {
            // 1. Sign up
            const result = await firebase.signUp(email, password, username);

            console.log("✅ Registration successful:", result);

            // 3. Clear form
            setEmail('');
            setUsername('');
        } catch (err) {
            alert(err.message);
        } finally {
            setPassword('');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (firebase.userLogged) {
            navigate('/')
        }


    }, [firebase.userLogged])


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Register</h2>
            <form onSubmit={handleClick} className={styles.form}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Name" className={styles.input} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className={styles.input} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className={styles.input} />
                <button type="submit" className={styles.submitBtn}>
                    {loading ? <BtnLoader play={loading} height={'20px'} width={'20px'} /> : 'Register'}

                </button>
            </form>

            <div className={styles.orSeparator}>or</div>
            <GoogleButton label="Sign up with Google" onClick={() => firebase.signInWithGoogle()} />

            <p className={styles.linkText}>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}
