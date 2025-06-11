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
import { createContext, useContext, useEffect, useState } from "react";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyDCQwcDTSiW9fbff0tLKeb4TBCcTGjjACo",
    authDomain: "kova-mining.firebaseapp.com",
    projectId: "kova-mining",
    storageBucket: "kova-mining.appspot.com",
    messagingSenderId: "336321238235",
    appId: "1:336321238235:web:500ec5d9d3102be282a8fe",
    measurementId: "G-MWYFS8NNMR"
};

// Firebase setup
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Context
export const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// Provider
export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Track auth state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });
        return () => unsubscribe();
    }, []);

    // Register with email/password
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
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



    // Values to share
    const contextValue = {
        user,
        signUp,
        login,
        logout,
        signInWithGoogle,
    };

    return (
        <FirebaseContext.Provider value={contextValue}>
            {children}
        </FirebaseContext.Provider>
    );
};
