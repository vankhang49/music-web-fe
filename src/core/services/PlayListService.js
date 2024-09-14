import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllPlaylist = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/auth/playlist`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}