import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Flex, Group, Layout, Header, Sidebar, Nav, RenderIf, useResponsive, useElementPosition, Input, Avatar, Main, Footer, Grid, Card, ThemeSwitcher, SettingThemesButton, Typography, AudioPlayer, cn } from "lvq";
import Logo from '../assets/images/logo-music.png'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import {CiHome, CiSettings} from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";
import {useState} from "react";  
import {PlayMusicFooter} from "../components/Footer/PlayMusicFooter";
import {usePlayMusic} from "../core/contexts/PlayMusicContext";
import {LyricsPlay} from "../components/LyricsPlay/LyricsPlay";
import { ModalUserAccess } from "../components/Modal/ModalUserAccess";
import { navigationHomeItems1, navigationHomeItems2, navigationHomeItems3 } from "../data";
import {LyricAndComment} from "../components/LyricAndComment/LyricAndComment";
import { SidebarHomeMobile } from "../components/SideBar/SidebarHomeMobile";
import {toast} from "react-toastify";

function LayoutHome() {
    const [isShowPlayLyrics, setShowPlayLyrics] = useState(false);
    const {playSongList,} = usePlayMusic();
    const isAuthenticated = !!localStorage.getItem("isAuthenticated");
    const avatar = localStorage.getItem("avatar");
    const { position: positionHeader, elementRef: elementRefHeader } = useElementPosition();
    const { position: positionSidebar, elementRef: elementRefSideBar } = useElementPosition();
    const { position: positionFooter, elementRef: elementRefFooter } = useElementPosition();
    const [openModalAvatar, setOpenModalAvatar] = useState(false)
    const [openModalMenuHome, setOpenModalMenuHome] = useState(false)

    const navigate = useNavigate();

    const breakpoints = useResponsive([480, 640, 768, 1024, 1280, 1536])

    const home = () => {
        navigate('/');
    }

    const handleShowPlayLyrics = () => {
        setShowPlayLyrics(!isShowPlayLyrics);
    }

    return (
        <Layout className={'layout-home'}>
            <Group className="flex h-full max-h-svh overlay" gd={{overflow:"hidden", height: '100vh'}}>
                <RenderIf isTrue={true}>
                    <Sidebar ref={elementRefSideBar} gd={{ marginBottom: (positionFooter.bottom - positionFooter.top) }} className="overflow-auto hidden md:!flex">
                        <Button text="" className="logo-app" theme="logo" size={1} icon={<img src={Logo} height="60px" onClick={() => home()} />} />
                        <Nav listNav={navigationHomeItems1} LinkComponent={Link} className="" activeClass="active-class" overflow={false} />
                        <Typography className="hr-top"></Typography>
                        <Nav listNav={navigationHomeItems2} LinkComponent={Link} className="" activeClass="active-class" />
                        <Nav listNav={navigationHomeItems3} LinkComponent={Link} className="" activeClass="active-class" gd={{ marginTop: "auto" }} overflow={false} />
                    </Sidebar>
                </RenderIf>
                <Group>
                    <Header ref={elementRefHeader} fixed className="backdrop-blur bg-opacity-80 md:px-4" gd={{ left: positionSidebar.right }} >
                        <Flex gap={3} justifyContent="between">
                            <Flex gap={3} className="flex-1">
                                <RenderIf isTrue={[0, 1, 2].includes(breakpoints)}>
                                    <Button text="" theme="reset" icon={<MdMenuOpen size={24} color="gray" />} onClick={() => setOpenModalMenuHome(!openModalMenuHome)} />
                                </RenderIf>
                                <RenderIf isTrue={[3, 4, 5, 6].includes(breakpoints)}>
                                    <Button text="" theme="reset" icon={<FaArrowLeftLong color="gray" />} />
                                    <Button text="" theme="reset" icon={<FaArrowRightLong color="gray" />} />
                                </RenderIf>
                                <Input theme="search_2" className="search-home" placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." gd={{ maxWidth: "500px" }} />
                            </Flex>
                            <Flex gap={3}>
                                <RenderIf isTrue={[4, 5, 6].includes(breakpoints)}>
                                    <Flex className=" items-center">
                                        <SettingThemesButton />
                                        <ThemeSwitcher />
                                    </Flex>
                                </RenderIf>
                                <Button text="" theme="reset" className="" size={1} icon={<><IoIosNotificationsOutline size={24} /><Typography tag="span" className="m-0 !-ml-3 bg-red-600 h-fit rounded-full text-white px-1 text-[12px]">11</Typography></>} rounded="rounded-full" />
                                <Button text="" className="setting-home" theme="setting" icon={<CiSettings size={24} />} rounded="rounded-full" />
                                <Avatar src={isAuthenticated ? avatar : "https://avatars.githubusercontent.com/u/156965941?v=4"}
                                        size={40} id="avatar_active_modal_sigup" onClick={() => setOpenModalAvatar(!openModalAvatar)} />
                            </Flex>
                        </Flex>
                    </Header>
                    <Main withShadow={false} className="p-0 md:p-4" gd={{ marginTop: positionHeader.bottom, marginBottom: (positionFooter.bottom - positionFooter.top) }}>
                        <Outlet />
                    </Main>
                </Group>
            </Group>
            <Footer ref={elementRefFooter} className={cn("flex items-center backdrop-blur", playSongList.length < 1 && "hidden")}
                    fixed gd={{ height: "78px" }}>
                <PlayMusicFooter callPlayLyrics={handleShowPlayLyrics}/>
            </Footer>
            <LyricAndComment showLyrics={isShowPlayLyrics}></LyricAndComment>
            <ModalUserAccess isOpen={openModalAvatar} onClose={() => setOpenModalAvatar(!openModalAvatar)} />
            <RenderIf isTrue={[0, 1, 2].includes(breakpoints)}>
                <SidebarHomeMobile isOpen={openModalMenuHome} onClose={() => setOpenModalMenuHome(!openModalMenuHome)} />
            </RenderIf>
        </Layout>
    );
}

export default LayoutHome;