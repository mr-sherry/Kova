import React, { useEffect, useState } from 'react';
import GoogleButton from '../../Components/GoogleBtn/GoogleButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './Register.module.css';
import { useFirebase } from '../../Context/UseFirebase';
import BtnLoader from '../../Components/Animations/BtnLoaderUni';


export default function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [refer, setRefer] = useState(null)
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const { referId } = useParams();

    const navigate = useNavigate();

    const firebase = useFirebase()

    const selectedId = [1749816806054, 12345678, 87654321, 9876543210];

    const checkRefer = async (referCode) => {
        const isValid = await firebase.checkReferralCodeExists(referCode);

        if (isValid) {
            console.log("✅ Referral code is valid");
            return true;
        } else {
            console.log("❌ Invalid referral code");
            return false
        }
    }


    useEffect(() => {
        if (referId) {
            console.log("Referral ID:", referId);
            setRefer(referId);
        } else {
            const randomNum = Math.floor(Math.random() * 4);
            console.log("🚀 ~ Register ~ selectedId:", typeof selectedId)

            console.log("🚀 ~ useEffect ~ randomNum:", typeof randomNum)
            console.log(selectedId[randomNum]);

            setRefer(selectedId[randomNum])
        }
        // You can now save this ID in context, localStorage, etc.

    }, [referId]);




    const handleClick = async (e) => {
        e.preventDefault();

        if (!username.trim() || !email.trim() || !password.trim()) {
            alert("All fields are required!");
            return;
        }
        setLoading(true);

        const checking = await checkRefer(refer);

        if (checking) {
            try {
                // 1. Sign up
                await firebase.signUp(email, password, username, refer);
                // 3. Clear form
                setEmail('');
                setUsername('');
            } catch (err) {
                alert(err.message);
            } finally {
                setPassword('');
                setLoading(false);
            }
        } else {
            alert('inavlid refer');
            setLoading(false)
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
                <label htmlFor="">Refer Code</label>
                <input disabled value={refer} onChange={(e) => setRefer(e.target.value)} type="number" placeholder="Refer Code" className={styles.input} />
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
