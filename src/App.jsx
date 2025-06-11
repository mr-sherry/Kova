import React from 'react'
import Mining from './Pages/Mining/Mining'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import { FirebaseProvider } from './Context/UseFirebase';

function App() {
    const layoutStyle = {
        maxWidth: "480px",
        margin: "0 auto",
        padding: "20px 15px 40px",
        backgroundColor: "#fff",
        color: "#000",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
        position: "relative",
        minHeight: "100vh", // recommended for full view height
    };

    return (
        <div style={layoutStyle}>
            <FirebaseProvider>
                <Header />
                <Outlet />

            </FirebaseProvider>
        </div>
    )
}

export default App