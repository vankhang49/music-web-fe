import {Avatar, Button, Card, Grid, Modal, Typography} from 'lvq';
import React from 'react';
import {toast} from "react-toastify";
import {CiLogout} from "react-icons/ci";
import * as authenticationService from "../../core/services/AuthenticationService";

export const ModalMenuHeader = ({isOpen, onClose, avatar, fullName}) => {
    const handleLogout = async () => {
        authenticationService.logout();
        toast.success("Đăng xuất thành công");
    }

    return (
            <Modal isOpen={isOpen} onClose={onClose}
                   displayCoat={false}
                   idControl="avatar_active_modal_sigup"
                   position="relative" gd={{width: "20%", height: '60%', top: '9%', right: '1%', borderRadius: '10px'}}>

                <Grid gd={{maxWidth: "400px", display: "flex"}}>
                    <Avatar src={avatar} size={50}/>
                    <Typography center={true} gd={{textAlign: 'center'}} tag={"h4"}>{fullName}</Typography>
                </Grid>
                <Grid gd={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    border: "2px solid white",
                    borderRadius: "10px",
                    height: '40px',
                    position: 'absolute',
                    bottom: '10px',
                    width: "90%",
                    cursor: "pointer"
                }}
                >
                    <Button text="Đăng xuất" gap={2} theme="log_out" icon={<CiLogout size={22}/>}
                            gd={{marginTop: "auto"}} onClick={handleLogout}/>
                </Grid>
            </Modal>

    );
};
