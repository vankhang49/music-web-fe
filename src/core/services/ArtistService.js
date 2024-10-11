import axios from "axios";
import axiosClient from "../../utils/axiosClient";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllArtistWithPage = async (artistName, page) => {
    try {
        const temp
            = await axiosClient.get(`artists?artistName=${artistName}&page=${page-1}`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getAllArtist = async () => {
    try {
        const temp
            = await axiosClient.get(`artists/all`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export const getArtistById = async (artistId) => {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/artists/${artistId}`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}

export const getArtistByArtistName = async (artistName) => {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/artists/name/${artistName}`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}

export const saveArtist = async (artist) => {
    try {
        const temp = await axiosClient.post(`artists`, artist);
    } catch (e) {
        console.log(e)
        throw e.response?.data;
    }
}

export const updateArtist = async (artist) => {
    try {
        const temp = await axiosClient.put(`artists/${artist.artistId}`, artist);
    } catch (e) {
        console.log(e)
        throw e.response?.data;
    }
}