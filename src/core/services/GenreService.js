import axios from "axios";

const BASE_URL = "http://localhost:8080";

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