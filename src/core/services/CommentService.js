// import axiosInstance from "../../utils/axiosClient";
import axios from "axios";
import axiosClient from "../../utils/axiosClient";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getAllCommentsBySongId = async (songId, size) => {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/comments/song/${songId}?size=${size}`);
        return temp.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getAllRepliesByParentCommentId = async (parentCommentId, size) => {
    try {
        const temp = await axios.get(`${BASE_URL}/api/public/comments/replies/${parentCommentId}?size=${size}`);
        return temp.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const saveComment = async (comment) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;
        await axiosClient.post(`comments/user/${userId}`, comment);
    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const updateComment = async (comment) => {
    try {
        await axiosClient.put(`comments/${comment.id}`, comment);
    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const deleteComment = async (id) => {
    try {
        await axiosClient.delete(`comments/${id}`);
    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const likeComment = async (commentId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;
        await axiosClient.post(`comments/${commentId}/like?userId=${userId}`)

    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const dislikeComment = async (commentId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;
        await axiosClient.post(`comments/${commentId}/dislike?userId=${userId}`)

    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const hahaComment = async (commentId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;
        await axiosClient.post(`comments/${commentId}/haha?userId=${userId}`)

    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const wowComment = async (commentId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;
        await axiosClient.post(`comments/${commentId}/wow?userId=${userId}`)

    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const heartComment = async (commentId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;
        await axiosClient.post(`comments/${commentId}/heart?userId=${userId}`)

    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}

export const removeEmotionComment = async (commentId) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.userId;
        await axiosClient.delete(`comments/${commentId}/remove-emotion?userId=${userId}`)

    } catch (e) {
        console.log(e)
        throw e.response.data;
    }
}