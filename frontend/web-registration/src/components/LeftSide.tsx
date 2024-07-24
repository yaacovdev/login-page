import React from "react";

const LeftSide: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full m-9">
            <div className="flex justify-start">
                <div className="mt-5">
                    <img src="/images/logo.png" alt="Logo" className="mb-4" />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center ">
                <img src="/images/man.png" alt="Man" className="-mb-5" />
                <h1
                    className="text-white"
                    style={{
                        fontWeight: 64,
                        fontSize: "24px",
                        letterSpacing: "0%",
                    }}
                >
                    Welcome aboard my friend
                </h1>
                <p
                    className="text-white"
                    style={{
                        fontWeight: 64,
                        fontSize: "14px",
                        letterSpacing: "0%",
                    }}
                >
                    Just a couple of clicks and we start
                </p>
            </div>
        </div>
    );
};

export default LeftSide;
