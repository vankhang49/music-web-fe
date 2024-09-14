import axios from "axios";
import axiosClient from "../../utils/axiosClient";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllAlbumsWithPage = async (contentSearch, page) => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/albums?title=${contentSearch}&artistName=${contentSearch}&page=${page-1}`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getAllAlbums = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/albums/all`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getAllSuggestedAlbums = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/albums/page`);
        console.log(temp.data)
        return temp.data.content;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getAlbumById = async (albumId) => {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/albums/${albumId}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return {}
    }
}

export const saveAlbum = async (album) => {
    try {
        const temp = await axiosClient.post(`albums`, album);
        return temp.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}

export const updateAlbum = async (album) => {
    try {
        const temp = await axiosClient.put(`albums/${album.albumId}`, album);
        return temp.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}
