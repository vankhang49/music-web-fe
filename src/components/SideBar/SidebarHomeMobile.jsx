import { Button, Modal, Nav, Sidebar, Typography } from 'lvq';
import Logo from '../../assets/images/logo-music.png';
import { navigationHomeItems1, navigationHomeItems2, navigationHomeItems3 } from '../../data';
import { Link, useNavigate } from 'react-router-dom';
import shirt from "../../assets/icons/shirt.svg";
import {useState} from "react";

export const SidebarHomeMobile = ({ isOpen, onClose, openPlaylistModal, openSelectThemeModal }) => {
    const navigate = useNavigate();


    const home = () => {
        navigate('/');
    }

    const handleOpenPlaylistModal = () => {
        openPlaylistModal();
    }


    const handleOpenSelectThemeModal = () => {
        openSelectThemeModal();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} position='left' className='p-0'>
            <Sidebar gd={{height: "100vh"}}>
                <Button text="" className="logo-app" theme="logo" size={1} icon={<img src={Logo} height="60px" onClick={() => home()} />} />
                <Nav listNav={navigationHomeItems1} LinkComponent={Link} className="" activeClass="active-class" overflow={false} />
                <Typography className="hr-top"></Typography>
                <Nav listNav={navigationHomeItems2} LinkComponent={Link} className="" activeClass="active-class" />
                <Button theme={"reset"} text={"Thêm mới Playlist"}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPlaylistModal();
                        }}
                ></Button>
                <Button text="" className="setting-home"
                        theme="setting"
                        icon={<img src={shirt} alt={"shirt"} style={{width: "1.5rem", height: '1.5rem'}}/> }
                        rounded="rounded-full"
                        onClick={handleOpenSelectThemeModal}
                />
            </Sidebar>
        </Modal>
    );
};
