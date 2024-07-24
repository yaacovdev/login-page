import React, { useState } from "react";
import AuthRepository from "../repositories/AuthRepository";

interface LoginButtonProps {
    disabled: boolean;
    email: string;
    password: string;
    label: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
    disabled,
    email,
    password,
    label,
}) => {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const authRepository = new AuthRepository();
        if (label === "Log in") {
            authRepository.login(email, password).then((res) => {
                if (res !== true) {
                    setError(`Login failed failed \n${res}`);
                } else {
                    window.location.reload();
                }
            });
        } else {
            authRepository.register(email, password).then((res) => {
                if (res !== true) {
                    setError(`Registration failed \n${res}`);
                } else {
                    window.location.reload();
                }
            });
        }
    };
    return (
        <div className="flex flex-col items-center">
            {error && (
                <p className="text-red-500 mb-2 text-center whitespace-pre-line text-xs">
                    {error}
                </p>
            )}
            <button
                type="button"
                className={`
        bg-primary
        hover:bg-[#27368F] 
        text-white 
        text-sm
        font-bold 
        py-1
        px-4 
        rounded-full 
        focus:outline-none 
        focus:shadow-outline 
        w-full
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
                disabled={disabled}
                onClick={handleSubmit}
            >
                {label}
            </button>
        </div>
    );
};

export default LoginButton;
