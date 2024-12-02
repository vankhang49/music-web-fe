import axios from "axios";
import axiosClient from "../../utils/axiosClient";

const BASE_URL = process.env.REACT_APP_API_URL;

export async function getAllSongsWithPage(contentSearch, page) {
    try {
        const temp
            = await axiosClient.get(`songs?title=${contentSearch}&artistName=${contentSearch}&page=${page-1}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function getAllSongs() {
    try {
        const temp
            = await axiosClient.get(`songs/all`, {});
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
            = await axios.get(`${BASE_URL}/api/public/songs/suggestedSongs`, {});
        console.log(temp.data);
        return temp.data.content;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function getTop3SongsIn7Days() {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/songs/top-3-songs-in-7-days`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function getTop100SongsWithTimes(national, size) {
    try {
        if (size === undefined) {
            size = 100;
        }
        const temp
            = await axios.get(`${BASE_URL}/api/public/songs/top-song?national=${national}&size=${size}`);
        console.log(temp.data);
        return temp.data.content;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getAllFavoriteSongs = async (sort, direction,page,size) => {
    try {
        if (direction === undefined) {
            direction = "ASC";
        }
        const response
            = await axiosClient.get(`songs/favorites?sort=${sort}&direction=${direction}&page=${page}&size=${size}`);
        console.log(response.data)
        return response.data;
    } catch (e) {
        return [];
    }
}

export async function getNew100Songs() {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/songs/new-song-ratings`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function getNewSongsRelease(national) {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/songs/new-songs-release?national=${national}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}
export async function getTop100Songs() {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/songs/top-100-songs`);
        console.log(temp.data);
        return temp.data;
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
        const temp = await axios.post(`${BASE_URL}/api/auth/songs`, song);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        throw e.response?.data;
        
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

export const updateListens = async (songId) => {
    try {
        await axios.put(`${BASE_URL}/api/public/song-listens?songId=${songId}`);

    } catch (e) {
        console.log(e)
    }
}

