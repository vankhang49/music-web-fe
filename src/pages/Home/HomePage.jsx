import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Container, Flex, Grid, Button, Card, Typography} from "lvq";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {MdArrowForwardIos} from "react-icons/md";
import * as albumsService from "../../core/services/AlbumService";
import * as songService from "../../core/services/SongService";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import {IoHeartOutline} from "react-icons/io5";
import {BsThreeDots} from "react-icons/bs";
import {LiaMicrophoneAltSolid} from "react-icons/lia";
import {IoIosHeart} from "react-icons/io";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import wave from "../../assets/gif/icon-playing.gif";
import {FaPlay} from "react-icons/fa";
import ModalSongMenu from "../../components/Modal/ModalSongMenu";
import {songsData} from "../../data";
import {songSuggestions} from "../../data/songSuggestions";
import {albumsWantToListen} from "../../data/albumsWantToListen";
import AlbumCard from "../../components/AlbumAndPlayListCard/AlbumCard";
import SongCard from "../../components/SongCard/SongCard";

function HomePage() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const {
        playSongList,
        songIndexList,
        addSongList,
        changeSongIndex,
        toggleIsPlayingSong,
        isPlayingSong,
    } = usePlayMusic();

    const [albums, setAlbums] = useState([]);
    const [suggestedSongs, setSuggestedSongs] = useState([]);
    const [modalSongIndex, setModalSongIndex] = useState(0);
    const [isOpenSongMenu, setIsOpenSongMenu] = useState(false);

    useEffect(() => {
        let timeoutId;

        const fetchData = async () => {
            try {
                const apiPromise = (async () => {
                    await getAllAlbumsFromService();
                    await getAllSongSuggested();
                })();

                const timeoutPromise = new Promise((resolve) => {
                    timeoutId = setTimeout(() => {
                        resolve("timeout");
                    }, 30000);
                });

                const result = await Promise.race([apiPromise, timeoutPromise]);

                if (result === "timeout") {
                    setAlbums(albumsWantToListen);
                    setSuggestedSongs(songSuggestions);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
                setAlbums(albumsWantToListen);
                setSuggestedSongs(songSuggestions);
            }
        };

        fetchData();

        return () => clearTimeout(timeoutId);
    }, [])

    const getAllAlbumsFromService = async () => {
        const temp = await albumsService.getAllSuggestedAlbums();
        if (temp.length > 0) {
            setAlbums(temp);
        } else {
            setAlbums(albumsWantToListen);
        }
    }

    const getAllSongSuggested = async () => {
        const temp = await songService.getAllSuggestedSongs();
        if (temp.length > 0) {
            setSuggestedSongs(temp);
        } else {
            setSuggestedSongs(songSuggestions);
        }
    }

    const handlePlaySong = (index) => {
        if (playSongList !== suggestedSongs) {
            addSongList(suggestedSongs);
        }
        changeSongIndex(index);
    };

    const handlePlayAndPauseSong = () => {
        isPlayingSong ? toggleIsPlayingSong(false) : toggleIsPlayingSong(true);
    }

    const openSongMenu = (songId) => {
        setModalSongIndex(songId);
        setIsOpenSongMenu(true);
    }

    const handleCloseSongMenu = () => {
        setModalSongIndex(0);
        setIsOpenSongMenu(false);
    }

    return (
        <>
            <Container withShadow={false} gd={{overflow: "hidden"}}>
                <Slider {...settings}>
                    <Card
                        srcImg="https://photo-zmp3.zmdcdn.me/banner/e/9/0/b/e90bda49a4e6618b4b607a83131d11d2.jpg"></Card>
                    <Card
                        srcImg="https://photo-zmp3.zmdcdn.me/banner/2/d/2/d/2d2ddc0508828b26f6e59e8dd8395583.jpg"></Card>
                    <Card
                        srcImg="https://photo-zmp3.zmdcdn.me/banner/5/0/3/b/503b76b9c1d5102e06fe07c26b507a5c.jpg"></Card>
                </Slider>
            </Container>
            <Container withShadow={false}>
                <Flex alignItems="center" justifyContent="between">
                    <Typography tag="h2">Nghe Gần Đây</Typography>
                    <Button text="Tất cả" theme="transparent" size={1} icon={<MdArrowForwardIos/>} iconPosition="right"
                            gap={1}/>
                </Flex>
                <Grid columns={2} xs={2} md={4} xl={8} gap={6}>
                    <Card
                        srcImg="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/e/d/2/5/ed251cf560be4747e7737b535c357f07.jpg"
                        title="#zingchat"></Card>
                    <Card
                        srcImg="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/2/c/7/4/2c7465f78a167a8a5574959f8ed56e3d.jpg"
                        title="V-Pop mới ra lò"></Card>
                    <Card
                        srcImg="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/b/5/2/cb5210a2f85409e2bfb4275b0dfefc26.jpg"
                        title="Những bài hát hay nhất của Jack - J97"></Card>
                    <Card
                        srcImg="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/7/c/7/f/7c7fb0d2d81339468e6c582e57b0548e.jpg"
                        title="Remix thịnh hành"></Card>
                    <Card
                        srcImg="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/5/9/8/4/598431ad22ed29c7807b3b2c34482f94.jpg"
                        title="Today's V-Pop Hits"></Card>
                    <Card
                        srcImg="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/d/9/3/a/d93a2a516502800681b3bbc5f3091a2b.jpg"
                        title="Psytrance Universe"></Card>
                    <Card
                        srcImg="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/2/f/2/b/2f2b44d76526981e9b5052980bf1cd05.jpg"
                        title="Nhạc trẻ Balad cực thấm"></Card>
                    <Card
                        srcImg="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/e/f/3/5/ef35dc1f44cdf72ff581f2119a3069a5.jpg"
                        title="Trending Gen Z"></Card>
                </Grid>
            </Container>
            <Container withShadow={false}>
                <Flex alignItems="center" justifyContent="between">
                    <Typography tag="h2">Gợi Ý Dành Cho Bạn</Typography>
                    <Link to={"/new-release/songs"} gd={{color: "var(--color-text)"}}>
                        <Button text="Tất cả" theme="transparent" size={1} icon={<MdArrowForwardIos/>} iconPosition="right"
                                gap={1} gd={{color: "var(--color-text)"}}/>
                    </Link>
                </Flex>
                {/*Test Song*/}
                <Grid columns={1} md={2} xl={3} gap={6}>
                    {suggestedSongs && suggestedSongs.map((song, index) => (
                        <SongCard songList={suggestedSongs} song={song} index={index}/>
                    ))}
                </Grid>
            </Container>
            <Container withShadow={false}>
                <Flex alignItems="center" justifyContent="between">
                    <Typography tag="h2">Có thể bạn muốn nghe</Typography>
                    <Link to={"/new-release/albums"} gd={{color: "var(--color-text)"}}>
                        <Button text="Tất cả" theme="transparent" size={1} icon={<MdArrowForwardIos/>} iconPosition="right"
                                gap={1} gd={{color: "var(--color-text)"}}/>
                    </Link>
                </Flex>

                {/*Test Album*/}
                <Grid columns={2} sm={2} md={3} xl={6} gap={6}>
                    {albums && albums.map((album, index) => (
                        <AlbumCard album={album} key={index}/>
                    ))}
                </Grid>
            </Container>
            <Container withShadow={false}>
                <Flex alignItems="center" justifyContent="between">
                    <Typography tag="h2">Mới phát hành</Typography>
                    <Link to={"/new-release/songs"} gd={{color: "var(--color-text)"}}>
                        <Button text="Tất cả" theme="transparent" size={1} icon={<MdArrowForwardIos/>} iconPosition="right"
                                gap={1} gd={{color: "var(--color-text)"}}/>
                    </Link>
                </Flex>
                <Grid columns={1} sm={2} xl={3} gap={6}>
                    {suggestedSongs && suggestedSongs.map((song, index) => (
                        <SongCard songList={suggestedSongs} song={song} index={index}/>
                    ))}
                </Grid>
            </Container>
            <Container withShadow={false}>
                <Flex alignItems="center" justifyContent="between">
                    <Typography tag="h2">Nhạc Hot Gây Bão</Typography>
                    <Link to={"/new-release/albums"} gd={{color: "var(--color-text)"}}>
                        <Button text="Tất cả" theme="transparent" size={1} icon={<MdArrowForwardIos/>} iconPosition="right"
                                gap={1} gd={{color: "var(--color-text)"}}/>
                    </Link>
                </Flex>
                <Grid columns={2} sm={2} md={3} xl={6} gap={6}>
                    {albums && albums.map((album, index) => (
                        <AlbumCard album={album} key={index}/>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default HomePage;