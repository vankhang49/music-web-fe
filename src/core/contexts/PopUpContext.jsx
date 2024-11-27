import React, { createContext, useContext, useState } from 'react';
import "./PopUp.scss";
import {Button, Flex, Group, Typography} from "lvq";
import hi from "../../assets/gif/panda-hi.gif";
import bravo from "../../assets/gif/cute-dancing-panda.gif";
import naive from "../../assets/gif/dudu-cute-dudu-blur.gif";
import sorry from "../../assets/gif/cute-penguin.gif";
import me from "../../assets/gif/bubu-dudu-sseeyall.gif";
import {ImCancelCircle} from "react-icons/im";

const PopUpContext = createContext();

export const usePopUp = () => {
    return useContext(PopUpContext);
};

//render popup for notification with types: success, error, warning, info and default
export const PopUpProvider = ({ children }) => {
    const [popups, setPopups] = useState([]);

    // Hàm để thêm toast vào danh sách
    const addToast = (message, type = "success", duration = 3000) => {
        const id = Math.random().toString(36).substr(2, 9);
        setPopups([...popups, { id, message, type, duration }]);

        setTimeout(() => {
            setPopups((currentToasts) =>
                currentToasts.map((toast) =>
                    toast.id === id ? { ...toast, isExiting: true } : toast
                )
            );
        }, duration - 500);

        setTimeout(() => {
            setPopups((currentToasts) => currentToasts.filter(toast => toast.id !== id));
        }, duration);
    };

    const onClose = (id) => {
        setPopups((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
    }

    return (
        <PopUpContext.Provider value={addToast}>
            {children}

            <div className={"popup-message"}>
                {popups.map((popup) => (
                    <div className={`popup ${popup.isExiting ? "exit" : ""}`}>
                        <Flex className={'popup-action'}>
                            <img src={popup.type === 'success' ? bravo
                                : popup.type === 'error' ? sorry
                                : popup.type === 'warning' ? naive
                                : popup.type === 'info' ? me
                                : hi } alt="hi"/>
                        </Flex>
                        <Flex className={`${popup.type} popup-content`}>
                            <Typography tag={"p"}>{popup.message}</Typography>
                            <Button className={'close-popup'} theme={'reset'} onClick={() => onClose(popup.id)}
                                    icon={<ImCancelCircle />}></Button>
                        </Flex>
                    </div>
                ))}
            </div>
        </PopUpContext.Provider>
    );
};