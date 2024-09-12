import axios from "axios";
import {jwtDecode} from "jwt-decode";
import axiosClient from "../../utils/axiosClient";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

export const login = async (data) => {
    try {
        const response = await axios.post(`${apiUrl}/api/auth/authenticate`, data)
        console.log(response.data);
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        return error;
    }
}

export const register = async (userData) => {
    try{
        const response = await axios.post(`${apiUrl}/api/auth/register`, userData)
        return response.data;
    }catch(error){
        throw error.response.data.errors;
    }
}

export const getYourProfile = async (token) => {
    try{
        const response = await axiosClient.get(`get-profile`);
        console.log(response.data)
        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const updatePasswordUser = async (userData, token) => {
    try{
        const userId = localStorage.getItem("id");
        const response = await axiosClient.put(`update-password/${userId}`, userData);
        console.log(response)
        return response.data;
    }catch(err){
        console.log(err)
        err.message = "Cập nhật mật khẩu thất bại!"
        throw err.response.data.errors;
    }
}

/**AUTHENTICATION CHECKER */
export const logout = async() => {
    try {
        const userId = localStorage.getItem("id");
        await axiosClient.post(`logout?userId=${userId}`);
    } catch (e) {
        throw e;
    }
}

export const isAuthenticated = () =>{
    const user=JSON.parse(localStorage.getItem("user"));
    const token=user?.token;
    return !!token
}
export const getRoles = async () => {
    try {
        const response = await axiosClient.get(`${apiUrl}/api/auth/user-role`)
        return response.data;
    } catch (e) {
        return [];
    }
}
export const isAdmin = async() =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_ADMIN');

}
export const isAssistant = async() =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_ASSISTANT');

}
export const isListener = async() =>{
    const roles = await getRoles();
    return roles.some(role => role.roleName === 'ROLE_LISTENER');

}


export const adminOnly = () =>{
    return this.isAuthenticated() && this.isAdmin();
}