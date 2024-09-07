import { Button, Grid, Modal } from 'lvq';
import React, { useState } from 'react';
import ModalMenuSigUp from './ModalMenuSign';
import * as userService from "../../core/services/AuthenticationService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const ModalUserAccess = ({ isOpen, onClose }) => {
    const [isOpenModalMenu, setIsOpenModalMenu] = useState(false);
    const isAuthenticated = !!localStorage.getItem('user');
    const navigate = useNavigate();

    const handleModal = () => {
        onClose(); // Đóng Modal hiện tại
        setIsOpenModalMenu(true); // Mở ModalMenuSigUp
    };

    const handleLogout = async () => {
        try {
            await userService.logout();
            toast.success("Đăng xuất thành công!");
            localStorage.removeItem('user');
            onClose();
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} displayCoat={false} idControl="avatar_active_modal_sigup">
                {!isAuthenticated ?
                <Grid gd={{ maxWidth: "400px" }}>
                    <Button text="Đăng ký" gap={8} rounded="rounded-full" gd={{minWidth: "240px"}} onClick={handleModal}/>
                    <Button text="Đăng nhập" gap={8} rounded="rounded-full" gd={{minWidth: "240px"}} onClick={handleModal}/>
                </Grid>
                :
                <Grid gd={{ maxWidth: "400px" }}>
                    <Button text="Đăng xuất" gap={8} rounded="rounded-full" gd={{minWidth: "240px"}} onClick={handleLogout}/>
                </Grid>
                }
            </Modal>
            <ModalMenuSigUp isOpen={isOpenModalMenu} onClose={() => setIsOpenModalMenu(false)} />
        </>
    );
};
