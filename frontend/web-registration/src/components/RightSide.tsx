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
        <div className="p-9 flex flex-col justify-center bg-[#FFFFFF]">
            <h2
                className="font-semibold text-primary"
                style={{
                    fontSize: 20,
                    fontWeight: 300,
                    letterSpacing: "0%",
                    textAlign: "center",
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

                <div className="flex items-center  justify-end text-primary text-sm mb-4">
                    <button
                    >
                        Forgot password?
                    </button>
                </div>
                <LoginButton
                    label={isRegisterPage ? "Register" : "Log in"}
                    disabled={!isEmailValid}
                    email={email}
                    password={password}
                />
            </form>
            <div className="flex items-center justify-center mt-4">
                <SocialButton
                    label={"Google"}
                    imagePath={"/images/Google.png"}
                />

                <SocialButton
                    label={"Facebook"}
                    imagePath={"/images/Facebook.png"}
                />
            </div>
            {!isRegisterPage && (
                <div className="mt-4 text-center">
                    <p
                        className=""
                        style={{
                            color: "#7B7B7B",
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    >
                        Have no account yet?{" "}
                    </p>
                    <RedirectButton path="/register" label="Register" />
                </div>
            )}
            {isRegisterPage && (
                <div className="mt-4 text-center">
                    <p
                        className=""
                        style={{
                            color: "#7B7B7B",
                            fontSize: 14,
                            fontWeight: 500,
                        }}
                    >
                        Already have an account?{" "}
                    </p>
                    <RedirectButton path="/login" label="Login" />
                </div>
            )}
        </div>
    );
};

export default RightSide;
