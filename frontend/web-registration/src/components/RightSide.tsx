import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";
import LoginButton from "./LoginButton";
import SocialButton from "./SocialButton";
import RedirectButton from "./RedirectButton";
import { useLocation } from "react-router-dom";

const RightSide: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const location = useLocation();

    const isRegisterPage = location.pathname.endsWith("register");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        setIsEmailValid(validateEmail(email));
    };

    const validateEmail = (email: string) => {
        // Simple email validation regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <div className="flex items-center text-center justify-center w-full p-12 h-full bg-[#FFFFFF]">
            <div className="w-full flex flex-col max-w-md mx-auto">
                <h2
                    className="font-semibold text-primary text-center"
                    style={{
                        fontSize: 20,
                        fontWeight: 300,
                        letterSpacing: "0%",
                    }}
                >
                    {isRegisterPage ? "Register" : "Log in"}
                </h2>
    
                <form className="mt-12">
                    <CustomTextInput
                        placeholder="Email"
                        icon="mail"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <CustomTextInput
                        placeholder="Password"
                        icon="lock"
                        secureTextEntry
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
    
                    <div className="flex items-center justify-end text-primary text-xs mb-4">
                        <button>Forgot password?</button>
                    </div>
                    <LoginButton
                        label={isRegisterPage ? "Register" : "Log in"}
                        disabled={!isEmailValid}
                        email={email}
                        password={password}
                    />
                </form>
    
                <div className="flex items-center justify-center mt-4">
                    <div className="w-1/4 h-[1px] bg-gray-200"></div>
                    <p className="mx-1 text-sm text-gray-400">Or</p>
                    <div className="w-1/4 h-[1px] bg-gray-200"></div>
                </div>
                <div className="flex items-center justify-center mt-4 space-x-1">
                    <SocialButton
                        label={"Google"}
                        imagePath={"/images/Google.png"}
                    />
                    <SocialButton
                        label={"Facebook"}
                        imagePath={"/images/Facebook.png"}
                    />
                </div>
                <div className="mt-3 text-center text-xs w-full">
                    <p
                        className="mb-2"
                        style={{
                            color: "#7B7B7B",
                            fontWeight: 500,
                        }}
                    >
                        {isRegisterPage
                            ? "Already have an account?"
                            : "Have no account yet?"}{" "}
                    </p>
                    <RedirectButton
                        path={isRegisterPage ? "/login" : "/register"}
                        label={isRegisterPage ? "Login" : "Register"}
                    />
                </div>
            </div>
        </div>
    );
    
};

export default RightSide;
