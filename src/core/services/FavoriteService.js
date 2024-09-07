import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getAllFavorite = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/favorites`);
        return response.data;
    } catch (e) {
        return [];
    }
}
