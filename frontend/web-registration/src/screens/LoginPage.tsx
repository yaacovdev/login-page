// LoginPage.tsx
import React from "react";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";

const LoginPage: React.FC = () => {
    
    return (
        <div
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full h-screen mx-auto mt-10"
            style={{ maxHeight: "75.6667vh" }}
        >
            <LeftSide />
            <RightSide />
        </div>
    );
};

export default LoginPage;
