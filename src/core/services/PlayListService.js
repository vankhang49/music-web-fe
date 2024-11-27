import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllPlaylist = async (playlistName, page) => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/playlists/getAllWithPage?playlistName=${playlistName}&page=${page-1}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}
export const getAllPlaylistUser = async () => {
    try {
        const temp
            = await axios.get(`${BASE_URL}/api/public/playlists/getAll`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}
export const savePlaylistAuth = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/playlists`, data, {
            params: {
                userId: data.userId
            }
        });
        return response.data;
    }
    catch (e){
        console.error("Error saving PlaylistUser:", e);
        throw new Error("Không thể thêm mới");
    }
};
export const savePlaylistUser = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/public/playlists`, data, {
            params: {
                userId: data.userId
            }
        });
        return response.data;
    }
    catch (e){
        console.error("Error saving PlaylistUser:", e);
        throw new Error("Không thể thêm mới");
    }
};
export const removePlaylistById = async (playlistId) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/auth/playlists/remove/${playlistId}`);
        return response.data;
    } catch (error) {
        console.log(error + " error");
        return null;
    }
};
export const getPlaylistById = async (playlistId) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/public/playlists/${playlistId}`);
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e)
        return {}
    }
}

export const updatePlaylist = async (playlist) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/auth/playlists/update/${playlist.playlistId}`, playlist);
        return response.data;
    } catch (e) {
        console.log(e)
        return {};
    }
}

