import axios from "axios";

const BASE_URL = "http://localhost:8080";

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