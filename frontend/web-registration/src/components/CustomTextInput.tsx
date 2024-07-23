import React, { useState } from "react";

interface CustomTextInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
    icon: keyof typeof icons; // Use keyof to enforce icon keys
    secureTextEntry?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const icons = {
    mail: "/images/mail.png",
    eye: "/images/eye.png",
    eyeOff: "/images/eye-off.png",
    lock: "/images/lock.png",
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    placeholder,
    icon,
    secureTextEntry = false,
    value,
    onChange,
    ...rest
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(
        !secureTextEntry
    );

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-lg px-4 mb-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50">
            <img src={icons[icon]} alt={icon} className="w-5 h-5 mr-2" />
            <input
                type={
                    secureTextEntry && !isPasswordVisible ? "password" : "text"
                }
                placeholder={placeholder}
                className="flex-grow py-2 px-2 focus:outline-none"
                value={value}
                onChange={onChange}
                {...rest}
            />
            {secureTextEntry && (
                <img
                    src={icons[isPasswordVisible ? "eye" : "eyeOff"]}
                    alt="toggle visibility"
                    className="w-5 h-5 ml-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                />
            )}
        </div>
    );
};

export default CustomTextInput;
