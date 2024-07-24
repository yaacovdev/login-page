// LoginPage.tsx
import React from "react";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";

const LoginPage: React.FC = () => {
    return (
        <div
            className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden lg:max-w-[64%]  mx-auto"
        >
            <div className="flex w-full lg:w-[58.8%] justify-center items-center bg-primary">
                <LeftSide />
            </div>
            <div className="flex w-full lg:w-[41.2%] justify-center items-center">
                <RightSide />
            </div>
        </div>
    );
};

export default LoginPage;
