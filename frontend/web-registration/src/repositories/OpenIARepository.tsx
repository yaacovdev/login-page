import axios from "axios";

class OpenIARepository {
    async fetchRandomText() {
        try {
            const response = await axios.get(
                "http://localhost:3001/random-text"
            );
            return response.data.response.message.content;
        } catch (error : any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error(
                    "Server responded with an error:",
                    error.response.data
                );
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error setting up request:", error.message);
            }
            console.error("Error fetching random text:", error.config);
        }
    }
}

export default OpenIARepository;
