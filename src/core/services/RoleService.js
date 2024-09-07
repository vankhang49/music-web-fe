import axiosInstance from "../../utils/axiosClient";

export const getAllRoles = async () => {
    try {
        const response = await axiosInstance.get(`roles`);
        return response.data;
    }catch (e) {
        return [];
    }
};