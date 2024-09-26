import {Link, Outlet, useNavigate} from "react-router-dom";
import {
    Button,
    Flex,
    Group,
    Layout,
    Header,
    Sidebar,
    Nav,
    RenderIf,
    useResponsive,
    useElementPosition,
    Input,
    Avatar,
    Main,
    ThemeSwitcher,
    SettingThemesButton,
    Typography
} from "lvq";
import Logo from '../assets/images/logo-music.png'
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";
import {CiSettings} from "react-icons/ci";
import {IoIosNotificationsOutline} from "react-icons/io";
import {MdMenuOpen} from "react-icons/md";
import { navigationDashboardItems1, navigationDashboardItems2, navigationDashboardItems3} from "../data";
import {SidebarDashboardMobile} from "../components/SideBar/SidebarDashboardMobile";
import {useEffect, useState} from "react";
import React from 'react';

import {ModalMenuHeader} from "../components/Modal/ModalMenuHeader";

function LayoutDashboard() {
    const {position: positionHeader, elementRef: elementRefHeader} = useElementPosition();
    const {position: positionSidebar, elementRef: elementRefSideBar} = useElementPosition();
    const [openModalMenuDashboard, setOpenModalMenuDashboard] = useState(false)
    const navigate = useNavigate();
    const [avatar,setAvatar] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (user&&user.avatar) {
            setAvatar(user.avatar);
        } else{
            setAvatar('https://img.icons8.com/nolan/64/1A6DFF/C822FF/user-default.png');
        }
    }, []);

    const breakpoints = useResponsive([480, 640, 768, 1024, 1280, 1536])

    const home = () => {
        navigate('/');
    }
    const [openModalAvatar, setOpenModalAvatar] = useState(false);

    return (
        <Layout className={'layout-home'}>
            <Group className="flex h-full max-h-svh overlay">
                <RenderIf isTrue={true}>
                    <Sidebar ref={elementRefSideBar}
                             className="overflow-auto border-0 border-r border-dashed border-r-gray-400 hidden md:!flex">
                        <Button text="" className="logo-app" theme="logo" size={1}
                                icon={<img src={Logo} height="60px" width="100%" onClick={() => home()}/>}/>
                        <Nav listNav={navigationDashboardItems1} LinkComponent={Link} activeClass="active-class"
                             overflow={false}/>
                        <Typography className="hr-top"></Typography>
                        <Nav listNav={navigationDashboardItems2} LinkComponent={Link} activeClass="active-class"/>
                    </Sidebar>
                </RenderIf>
                <Group>
                    <Header ref={elementRefHeader} fixed className="backdrop-blur bg-opacity-80 md:px-4"
                            gd={{left: positionSidebar.right}}>
                        <Flex gap={3} justifyContent="between">
                            <Flex gap={3} className="flex-1">
                                <RenderIf isTrue={[0, 1, 2].includes(breakpoints)}>
                                    <Button text="" theme="reset" icon={<MdMenuOpen size={24} color="gray"
                                                                                    onClick={() => setOpenModalMenuDashboard(!openModalMenuDashboard)}/>}/>
                                </RenderIf>
                                <RenderIf isTrue={[3, 4, 5, 6].includes(breakpoints)}>
                                    <Button text="" theme="reset" icon={<FaArrowLeftLong color="gray"/>}/>
                                    <Button text="" theme="reset" icon={<FaArrowRightLong color="gray"/>}/>
                                </RenderIf>
                                <Input theme="search_2" className="search-home" placeholder="Tìm kiếm..."
                                       gd={{maxWidth: "500px"}}/>
                            </Flex>
                            <Flex gap={3}>
                                <RenderIf isTrue={[4, 5, 6].includes(breakpoints)}>
                                    <Flex className=" items-center">
                                        <SettingThemesButton/>
                                        <ThemeSwitcher/>
                                    </Flex>
                                </RenderIf>
                                <Button text="" theme="reset" className="" size={1}
                                        icon={<><IoIosNotificationsOutline size={24}/><Typography tag="span"
                                                                                                  className="m-0 !-ml-3 bg-red-600 h-fit rounded-full text-white px-1 text-[12px]">11</Typography></>}
                                        rounded="rounded-full"/>
                                <Button text="" className="setting-home" theme="setting" icon={<CiSettings size={24}/>}
                                        rounded="rounded-full"/>

                                <Avatar src={avatar} size={40}
                                        onClick={() => setOpenModalAvatar(!openModalAvatar)}  />
                            </Flex>
                        </Flex>
                    </Header>


                    <Main withShadow={false} className="p-0 md:p-4" gd={{marginTop: positionHeader.bottom}}>
                        <ModalMenuHeader isOpen={openModalAvatar} onClose={() => setOpenModalAvatar(!openModalAvatar)} avatar={avatar} fullName={user.fullName||''}/>
                        <Outlet/>
                    </Main>
                </Group>
            </Group>
            <RenderIf isTrue={[0, 1, 2].includes(breakpoints)}>
                <SidebarDashboardMobile isOpen={openModalMenuDashboard}
                                        onClose={() => setOpenModalMenuDashboard(!openModalMenuDashboard)}/>
            </RenderIf>
        </Layout>
    );
}

export default LayoutDashboard;