import React, { useEffect, useState } from "react";
import AuthRepository from "../repositories/AuthRepository";
import OpenIARepository from "../repositories/OpenIARepository";

const useRandomText = () => {
    // Custom hook to fetch random text only once and avoid refetching on re-renders
    const [randomText, setRandomText] = useState("");

    useEffect(() => {
        if (!randomText) {
            const openIARepository = new OpenIARepository();
            openIARepository.fetchRandomText().then((text) => {
                setRandomText(text);
            });
        }
    }, [randomText]);

    return randomText;
};

const HomePage: React.FC = () => {
    const randomText = useRandomText();

    const handleLogout = async () => {
        const authRepository = new AuthRepository();
        await authRepository.logout();
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="absolute top-4 right-4">
                <button
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full shadow-lg"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-8 m-4 w-full lg:w-1/2">
                <h1 className="text-2xl font-bold mb-4 text-textGray">
                    {randomText !== ""
                        ? "We generated for you a random text"
                        : "We are generating a random text for you"}
                </h1>
                <p className="text-lg text-gray-700 mb-4">{randomText}</p>
            </div>
        </div>
    );
};

export default HomePage;
