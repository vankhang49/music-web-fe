import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllFavorite = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/auth/favorites`);
        return response.data;
    } catch (e) {
        return [];
    }
}
