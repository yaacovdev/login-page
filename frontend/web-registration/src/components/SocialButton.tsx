import React from "react";
import AuthRepository from "../repositories/AuthRepository";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
const SocialButton: React.FC<{ label: string; imagePath: string }> = ({
    label,
    imagePath,
}) => {
    const authRepository = new AuthRepository();
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfoResponse = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            );

            authRepository.handleGoogleLogin(userInfoResponse.data);
        },
        onError: (error) => {
            console.log("Login Failed:", error);
        },
    });

    const handleLogin = () => {
        if (label === "Google") {
            googleLogin();
        } else if (label === "Facebook") {
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
                py-1
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
                text-xs 
            `}
            onClick={handleLogin}
            style={{
                width: "50%",
                fontWeight: 500,
                letterSpacing: "0%",
                textAlign: "center",
            }}
        >
            <img src={imagePath} alt="Google" className="w-5 h-5 mr-2" />
            {label}
        </button>
    );
};

export default SocialButton;
