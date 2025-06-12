// FirebaseContext.js

import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

// Firebase config
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Firebase setup
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

// Context
export const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// Provider
export const FirebaseProvider = ({ children }) => {
    const [userLogged, setUserLogged] = useState(null);

    // Track auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserLogged(currentUser || null);
        });
        return () => unsubscribe();
    }, []);

    // Register with email/password
    const signUp = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user) throw new Error("User creation failed");

            // Firestore logic
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: username || "",
                photoURL: user.photoURL || "",
                createdAt: serverTimestamp(),
                streak: 0,
                claimedTime: null,
                points: 0,
            });

            return userCredential;
        } catch (error) {
            console.error("SignUp Error:", error.message);
            throw error; // bubble up to the caller
        }
    };



    // Login with email/password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google login
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Logout
    const logout = () => {
        return signOut(auth);
    };

    const fetchUserData = async (uid) => {
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                return userSnap.data(); // returns user profile object
            } else {
                console.warn("User profile not found in Firestore");
                return null;
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);
            return null;
        }
    };


    // update timestamp of claim on click
    const updateClaimedTime = async (uid) => {
        try {
            const userRef = doc(db, "users", uid);
            await updateDoc(userRef, {
                claimedTime: serverTimestamp(),
            });
            console.log("✅ Claimed time updated successfully");
        } catch (error) {
            console.error("❌ Error updating claimed time:", error.message);
        }
    };


    // FirebaseContext.js

    // Utility to calculate milliseconds left until next claim
    const getClaimCooldown = async (uid) => {
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const data = userSnap.data();
                const claimedTime = data.claimedTime?.toDate?.();

                if (!claimedTime) return 0;

                const now = new Date();
                const nextEligible = new Date(claimedTime.getTime() + 1 * 60 * 1000);
                const remaining = nextEligible - now;

                return remaining > 0 ? remaining : 0;
            } else {
                console.warn("User not found for cooldown check.");
                return 0;
            }
        } catch (error) {
            console.error("❌ Error getting claim cooldown:", error.message);
            return 0;
        }
    };

    // Values to share
    const contextValue = {
        userLogged,
        signUp,
        login,
        logout,
        signInWithGoogle,
        fetchUserData,
        updateClaimedTime,
        getClaimCooldown
    };

    return (
        <FirebaseContext.Provider value={contextValue}>
            {children}
        </FirebaseContext.Provider>
    );
};
