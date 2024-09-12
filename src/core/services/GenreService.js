import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllGenre = async () => {
    try {
        const temp
            = await axios.get(`${apiUrl}/api/public/genres`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}