import React from 'react'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import { FirebaseProvider, useFirebase } from './Context/UseFirebase';
import FullPageLottieLoader from './Components/Animations/FullPageLottieLoader';



const Layout = () => {
    const firebase = useFirebase();

    const layoutStyle = {
        maxWidth: "480px",
        margin: "0 auto",
        padding: "20px 15px 40px",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        position: "relative",
        minHeight: "100vh",
    };

    if (!firebase.isFirebaseReady) return <FullPageLottieLoader />;

    return (
        <div style={layoutStyle}>
            <Header />
            <Outlet />
        </div>
    );
};


function App() {

    return (
        <div>
            <FirebaseProvider>
                <Layout />
            </FirebaseProvider>
        </div>
    )
}

export default App