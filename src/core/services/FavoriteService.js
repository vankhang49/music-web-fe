import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllFavorite = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/favorites`);
        return response.data;
    } catch (e) {
        return [];
    }
}
