import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllGenre = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/genres`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}