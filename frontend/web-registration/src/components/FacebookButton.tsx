import React from "react";

const FacebookButton: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
    const handleGoogleLogin = () => {
        const popup = window.open(
            "http://localhost:5000/auth/login/facebook",
            "FacebookAuth",
            "width=500,height=600"
        );
        
        if (popup) {
            popup.focus();
        } else {
            alert("Veuillez autoriser les pop-ups pour ce site.");
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
    ml-1
    text-primary
  `}
            disabled={disabled}
            style={{
                width: "50%",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0%",
                textAlign: "center",
            }}
            onClick={handleGoogleLogin}
        >
            <img
                src="/images/Facebook.png"
                alt="Google"
                className="w-5 h-5 mr-2"
            />
            Facebook
        </button>
    );
};

export default FacebookButton;
