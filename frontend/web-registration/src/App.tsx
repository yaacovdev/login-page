import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("JWT"));

    useEffect(() => {
        const handleTokenMessage = (event:any) => {
            // Check the origin of the message
            if (event.origin === "http://localhost:5000") {
                // Extract the JWT token from the event data
                const { JWT } = event.data;

                // Store the token in local storage and update the state
                if (JWT) {
                    console.log("JWT token received:", JWT);
                    localStorage.setItem("JWT", JWT);
                    setToken(JWT); // Update the state
                } else {
                    console.log("JWT token not found in the message data.");
                }
            } else {
                console.log("Invalid origin:", event.origin);
            }
        };

        // Set up the event listener
        window.addEventListener("message", handleTokenMessage, false);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("message", handleTokenMessage);
        };
    }, []);

    return (
        <Router>
            <div className="min-h-screen flex items-center" style={{ backgroundColor: "#5769D4" }}>
                <div className="w-full">
                    <Routes>
                        <Route path="/login" element={token ? <Navigate to="/home" /> : <LoginPage />} />
                        <Route path="/register" element={token ? <Navigate to="/home" /> : <LoginPage />} />
                        <Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" />} />
                        <Route path="*" element={<Navigate to={token ? "/home" : "/login"} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
