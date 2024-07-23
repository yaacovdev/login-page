import React from "react";
import AuthRepository from "../repositories/AuthRepository";

const SocialButton: React.FC<{ label: string , imagePath:string}> = ({ label, imagePath }) => {
    const handleLogin = () => {
        const authRepository = new AuthRepository();
        if (label === "Google") {
            authRepository.googleLogin();
        }
        else if (label === "Facebook") {
            authRepository.facebookLogin();
        }
    };

    
    return (
        <button
            className={`
                flex
                items-center
                justify-center
                border
                border-blue-500
                text-blue-500
                font-bold
                py-2
                px-4
                rounded-full
                hover:bg-[#F0F0F0]
                focus:outline-none
                focus:ring
                focus:ring-blue-300
                disabled:opacity-50
                disabled:cursor-not-allowed 
                mr-1
                text-primary
            `}
            onClick={handleLogin}
            style={{
                width: "50%",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0%",
                textAlign: "center",
            }}
        >
            <img
                src={imagePath}
                alt="Google"
                className="w-5 h-5 mr-2"
            />
            {label}
        </button>
    );
};


export default SocialButton;
