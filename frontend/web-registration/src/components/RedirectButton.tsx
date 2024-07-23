import React from "react";
import { useNavigate } from "react-router-dom";

const RedirectButton: React.FC<{ path: string; label: string; }> = ({ path, label }) => {
    const navigate = useNavigate();

    const handleClick = () => {
            navigate(path);
    };

    return (
        <button
            className={`
                font-bold
                py-2
                w-full
                border
                border-blue-500
                font-bold
                rounded-full
                hover:bg-[#F0F0F0]
                focus:outline-none
                focus:ring
                text-primary
            `}
            onClick={handleClick}
            style={{
                width: "50%",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0%",
                textAlign: "center",
                color: "#",
            }}
        >
            {label}
        </button>
    );
};

export default RedirectButton;
