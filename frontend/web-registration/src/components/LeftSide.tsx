import React from "react";

const LeftSide: React.FC = () => {
    return (
        <div
            className="w-2/3 p-8 flex flex-col items-center justify-center bg-primary"
        >
            <div className="w-full flex justify-start">
                <img src="/images/logo.png" alt="Logo" className="mb-4" />
            </div>
            <img src="/images/man.png" alt="Man" className="-mb-5" />
            <h1
                className="text-white font-lato"
                style={{
                    fontWeight: 64,
                    fontSize: "24px",
                    letterSpacing: "0%",
                }}
            >
                Welcome aboard my friend
            </h1>
            <p
                className="text-white font-lato"
                style={{
                    fontWeight: 64,
                    fontSize: "14px",
                    letterSpacing: "0%",
                }}
            >
                Just a couple of clicks and we start
            </p>
        </div>
    );
};

export default LeftSide;
