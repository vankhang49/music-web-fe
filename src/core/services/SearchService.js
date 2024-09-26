import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getSearchList = async (keyword) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/public/search?keyword=${keyword}`);
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}