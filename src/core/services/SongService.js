import axios from "axios";
import axiosClient from "../../utils/axiosClient";

const BASE_URL = "http://localhost:8080";

export async function getAllSongs() {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/songs`, {});
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function getAllSuggestedSongs() {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/songs/page`, {});
        console.log(temp.data);
        return temp.data.content;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getSongById = async (songId) => {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/songs/${songId}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}

export const saveSong= async (song) => {
    try {
        const temp = await axiosClient.post(`songs`, song);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        throw new Error("Không thể thêm mới!")
    }

}

export const updateSong= async (song) => {
    try {
        const temp = await axiosClient.put(`songs/${song.songId}`, song);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        throw new Error("Không thể cập nhật!")
    }
}

