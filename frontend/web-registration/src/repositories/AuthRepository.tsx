import axios from "axios";

class AuthRepository {
    private AUTH_API_URL =
        process.env.AUTH_API_URL || "http://localhost:5000/auth";
    private axiosInstance = axios.create({
        baseURL: this.AUTH_API_URL,
    });
    async login(email: string, password: string): Promise<any> {
        try {
            // Make an API call to authenticate the user
            const response = await this.axiosInstance.post("/login", {
                email,
                password,
            });

            // Check if the login was successful
            if (response.status === 200) {
                // Store the authentication token in local storage or cookies
                localStorage.setItem("JWT", response.data.token);
                return true;
            } else if (response.status === 209) {
                return response.data.message;
            } else {
                return response.data;
            }
        } catch (error) {
            console.error("Error occurred during login:", error);
            return false;
        }
    }

    async register(email: string, password: string): Promise<any> {
        try {
            // Make an API call to register the user
            const response = await this.axiosInstance.post("/register", {
                email,
                password,
            });

            // Check if the registration was successful
            if (response.status === 201) {
                // Store the authentication token in local storage or cookies
                localStorage.setItem("JWT", response.data.token);
                return true;
            } else if (response.status === 209) {
                return response.data.message;
            } else {
                console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.error("Error occurred during registration:", error);
            return false;
        }
    }

    async logout(): Promise<void> {
        try {
            // Make an API call to log out the user
            await this.axiosInstance.get("/logout");

            // Remove the authentication token from local storage or cookies

            console.log("Logging out");
            localStorage.removeItem("JWT");
        } catch (error) {
            console.error("Error occurred during logout:", error);
        }
    }
    async googleLogin(): Promise<void> {
        const popup = window.open(
            "http://localhost:5000/auth/login/google",
            "GoogleAuth",
            "width=500,height=600"
        );

        if (popup) {
            popup.focus();
        } else {
            alert("Please enable pop-ups for this site.");
        }
    }

    async facebookLogin(): Promise<void> {
        const popup = window.open(
            "http://localhost:5000/auth/login/facebook",
            "FacebookAuth",
            "width=500,height=600"
        );

        if (popup) {
            popup.focus();
        } else {
            alert("Please enable pop-ups for this site.");
        }
    }
}

export default AuthRepository;
