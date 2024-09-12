import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllPlaylist = async () => {
    try {
        const temp
            = await axios.get(`${apiUrl}/api/auth/playlist`);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}