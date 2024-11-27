import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Flex, Group, Layout, Header, Sidebar, Nav, RenderIf, useResponsive, useElementPosition, Input, Avatar, Main, Footer, Grid, Card, SettingThemesButton, Typography, AudioPlayer, cn } from "lvq";
import Logo from '../assets/images/logo-music.png'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import {CiHome, CiSettings} from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdMenuOpen } from "react-icons/md";
import {useEffect, useState} from "react";
import {PlayMusicFooter} from "../components/Footer/PlayMusicFooter";
import {usePlayMusic} from "../core/contexts/PlayMusicContext";
import { ModalUserAccess } from "../components/Modal/ModalUserAccess";
import { navigationHomeItems1, navigationHomeItems2, navigationHomeItems3 } from "../data";
import {LyricAndComment} from "../components/LyricAndComment/LyricAndComment";
import { SidebarHomeMobile } from "../components/SideBar/SidebarHomeMobile";

import {toast} from "react-toastify";
import {NotificationBox} from "../components/NotificationBox/NotificationBox";
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
import * as notificationService from "../core/services/NotificationService";

import {PlayQueue} from "../components/Play-queue/PlayQueue";
import ModalSearch from "../components/Modal/ModalSearch";
import InputSearchHome from "../components/InputSearch/InputSearchHome";
import ModalSongMenu from "../components/Modal/ModalSongMenu";
import CreatePlaylistModal from "../components/CreatePlaylistModal/CreatePlaylistModal";
import {ModalSelectTheme} from "../components/Modal/ModalSelectTheme";
import shirt from "../assets/icons/shirt.svg";
import funny from "../assets/gif/looping-infinite-loop.gif";

const BASE_URL = process.env.REACT_APP_API_URL;

var stompClient = null;

function LayoutHome() {
    const [isShowPlayLyrics, setShowPlayLyrics] = useState(false);
    const [isShowQueues, setIsShowQueues] = useState(false);
    const [isOpenSongMenu, setIsOpenSongMenu] = useState(false);
    const [isModalPlaylistOpen, setIsModalPlaylistOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const {
        playSongList,
        songIndexList,
        isPlayingSong,
    } = usePlayMusic();
    const isAuthenticated = !!localStorage.getItem("isAuthenticated");
    const [avatar, setAvatar] = useState(null);
    const { position: positionHeader, elementRef: elementRefHeader } = useElementPosition();
    const { position: positionSidebar, elementRef: elementRefSideBar } = useElementPosition();
    const { position: positionFooter, elementRef: elementRefFooter } = useElementPosition();

    const [openModalSearch, setOpenModalSearch] = useState(false)
    const [openModalAvatar, setOpenModalAvatar] = useState(false)
    const [openModalMenuHome, setOpenModalMenuHome] = useState(false)
    const [openModalSelectTheme, setOpenModalSelectTheme] = useState(false)
    const [openNotification, setOpenNotification] = useState(false)
    const [numberNotification, setNumberNotification] = useState(0)
    const [notifications, setNotifications] = useState([])

    const [positionInputSearch, setPositionInputSearch] = useState({top: 0, left: 0, bottom: 0, right: 0});

    const navigate = useNavigate();

    const breakpoints = useResponsive([480, 640, 768, 1024, 1280, 1536])

    const connect = () => {
        let Sock = new SockJS(`${BASE_URL}/ws`);
        stompClient = Stomp.over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/topic/noti-album', onMessageAlbum);
        stompClient.subscribe('/topic/noti-song', onMessageSong);
    }
    const onMessageAlbum =(message)=>{
        toast.dark("Vừa có album mới!", {autoClose: 500})
        console.log(JSON.parse(message.body))
        getAllNotifications(3)
    }
    const onMessageSong =(message)=>{
        toast.dark("Vừa có song mới!", {autoClose: 500})
        console.log(JSON.parse(message.body))
        getAllNotifications(3)

    }
    const onError=(error)=>{
        console.log(error)
    }

    useEffect(()=>{
        if (isAuthenticated) {
            const user = JSON.parse(localStorage.getItem("user"));
            setAvatar(user?.avatar);
        }
    }, [isAuthenticated])

    useEffect(() => {
        connect();
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    useEffect(() => {
            getAllNotifications(3);
            if(openNotification === true){
                updateMarkAllRead();
            }
    }, [openNotification]);
    const getAllNotifications =(roleId)=>{
        notificationService.getAllNotifications(roleId).then(res => {
            setNotifications(res);
            console.log(res)
            const count = res.reduce((acc, notification) =>
                !notification.statusRead ? acc + 1 : acc, 0
            );
            setNumberNotification(count)
        }).catch(err=>console.log(err))
    }
    const updateMarkAllRead =()=>{
        notificationService.updateMarkAllRead().then(res => console.log(res)).catch()
    }

    const home = () => {
        navigate('/');
    }

    const handleShowPlayLyrics = () => {
        setShowPlayLyrics(!isShowPlayLyrics);
    }
    const handleCloseNotification = () => {
        setOpenNotification(!openNotification);
    }

    const getNumberNoRead =(amount)=>{
        setNumberNotification(amount)
    }


    const handleShowPlayList = () => {
        setIsShowQueues(!isShowQueues);
    }

    const handleChangeSearchValue = (value) =>{
        setSearchValue(value);
        setOpenModalSearch(!!value);
    }

    const handleOpenMenuSong = () => {
        setIsOpenSongMenu(!isOpenSongMenu);
    }

    const handleCloseSongMenu = () => {
        setIsOpenSongMenu(false);
    }

    const handleOpenPlaylistModal = () => {
        setIsModalPlaylistOpen(true);
    }

    const handleClosePlaylistModal = () => {
        setIsModalPlaylistOpen(false);
    }

    const handleOpenSelectThemeModal = () => {
        setOpenModalSelectTheme(true);
    }

    const handleCloseSelectThemeModal = () => {
        setOpenModalSelectTheme(false);
    }
    return (
        <Layout className={'layout-home'}>
            <Group className="flex h-full max-h-svh overlay " gd={{overflow:"hidden", height: '100vh'}}>
                <RenderIf isTrue={true}>
                    <Sidebar ref={elementRefSideBar} gd={{marginBottom: (positionFooter.bottom - positionFooter.top)}}
                             className="overflow-auto hidden md:!flex backdrop-blur bg-opacity-80">
                        <Button text="" className="logo-app" theme="logo" size={1}
                                icon={<img src={Logo} height="60px" onClick={() => home()}/>}/>
                        <Nav listNav={navigationHomeItems1} LinkComponent={Link} className="" activeClass="active-class"
                             overflow={false}/>
                        <Typography className="hr-top"></Typography>

                        <Nav listNav={navigationHomeItems2} LinkComponent={Link} className=""

                             activeClass="active-class"/>
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
                </RenderIf>
                <Group>
                    <Header ref={elementRefHeader} fixed className="backdrop-blur bg-opacity-80 md:px-4"
                            gd={{left: positionSidebar.right}}>
                        <Flex gap={3} justifyContent="between">
                            <Flex gap={3} className="flex-1" gd={{position: "relative"}}>
                            <RenderIf isTrue={[0, 1, 2].includes(breakpoints)}>
                                    <Button text="" theme="reset" icon={<MdMenuOpen size={24} color="gray" />} onClick={() => setOpenModalMenuHome(!openModalMenuHome)} />
                                </RenderIf>
                                <RenderIf isTrue={[3, 4, 5, 6].includes(breakpoints)}>
                                    <Button text="" theme="reset" icon={<FaArrowLeftLong color="gray" />} />
                                    <Button text="" theme="reset" icon={<FaArrowRightLong color="gray" />} />
                                </RenderIf>

                                <InputSearchHome onValueChange={(value)=>handleChangeSearchValue(value)}
                                                 onPositionChange={(position) => setPositionInputSearch(position)} />

                            </Flex>
                            <Flex gap={3}>
                                <RenderIf isTrue={[4, 5, 6].includes(breakpoints)}>
                                    <Flex className=" items-center">
                                        <SettingThemesButton />
                                        <Button text="" className="setting-home"
                                                theme="setting"
                                                icon={<img src={shirt} alt={"shirt"} style={{width: "1.5rem", height: '1.5rem'}}/> }
                                                rounded="rounded-full"
                                                onClick={handleOpenSelectThemeModal}
                                        />
                                    </Flex>
                                </RenderIf>
                                <Button text="" theme="reset" className="" size={1} icon={<><IoIosNotificationsOutline size={24} /><Typography tag="span" className="m-0 !-ml-3 bg-red-600 h-fit rounded-full text-white px-1 text-[12px]">{numberNotification}</Typography></>} rounded="rounded-full" onClick={()=>setOpenNotification(!openNotification)} />
                                <Button text="" className="setting-home" theme="setting" icon={<CiSettings size={24} />} rounded="rounded-full" />
                                <Avatar src={avatar ? avatar : "https://avatars.githubusercontent.com/u/156965941?v=4"}
                                        size={40} id="avatar_active_modal_sigup" onClick={() => setOpenModalAvatar(!openModalAvatar)} />
                            </Flex>
                        </Flex>
                    </Header>

                    <Main withShadow={false} className="p-0 md:p-4" gd={{ marginTop: positionHeader.bottom, marginBottom: (positionFooter.bottom - positionFooter.top) }}>
                        <Outlet />
                    </Main>
                </Group>
            </Group>
            { isPlayingSong === true &&
                <Group gd={{position:'absolute', bottom:78, right: 50, width: 100}}>
                    <img src={funny} alt="funny" width="100%"/>
                </Group>
            }
            <Footer ref={elementRefFooter} className={cn("flex items-center backdrop-blur !py-2", playSongList.length < 1 && "hidden")}
                    fixed gd={{ height: "78px" }}>
                <PlayMusicFooter callPlayLyrics={handleShowPlayLyrics}
                                 callPlayList={handleShowPlayList}
                                 openMenuSongFooter={handleOpenMenuSong}
                />
            </Footer>
            <LyricAndComment showLyrics={isShowPlayLyrics}></LyricAndComment>
            <PlayQueue showPlayList={isShowQueues}></PlayQueue>
            <ModalSearch isOpen={openModalSearch} searchValue={searchValue}
                         onClose={() => setOpenModalSearch(false) } position={positionInputSearch}/>
            <ModalUserAccess isOpen={openModalAvatar} onClose={() => setOpenModalAvatar(!openModalAvatar)} />
            <RenderIf isTrue={[0, 1, 2].includes(breakpoints)}>
                <SidebarHomeMobile isOpen={openModalMenuHome} onClose={() => setOpenModalMenuHome(!openModalMenuHome)} />
            </RenderIf>

            <NotificationBox openNotification={openNotification} callOpenNotification={handleCloseNotification} notifications={notifications}></NotificationBox>

            {playSongList.length > 0 &&
                <ModalSongMenu
                    isOpen={isOpenSongMenu}
                    onClose={handleCloseSongMenu}
                    song={playSongList[songIndexList]}
                ></ModalSongMenu>
            }
                <CreatePlaylistModal
                    isOpen={isModalPlaylistOpen}
                    onClose={handleClosePlaylistModal}
                ></CreatePlaylistModal>
            <ModalSelectTheme
                isOpen={openModalSelectTheme}
                onClose={handleCloseSelectThemeModal}
            />

        </Layout>
    );
}

export default LayoutHome;
