import {Button, Card, Container, Flex, Group, Table, Typography} from "lvq";
import React, {useEffect, useState} from "react";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import * as songService from "../../core/services/SongService";
import {Link, useParams} from "react-router-dom";
import "./NewRealease.scss";
import * as albumService from "../../core/services/AlbumService";

export default function NewRelease () {
    const {
        playSongList,
        addSongList,
        changeSongIndex,
    } = usePlayMusic();
    const [numberSelected, setNumberSelected] = useState(0);
    const [national, setNational] = useState("");
    const [releaseSongs, setReleaseSongs] = useState([]);
    const [releaseAlbums, setReleaseAlbums] = useState([]);
    const { option } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (option === 'songs') {
                await getNewSongsRelease(national);
            } else {
                await getNewAlbumRelease(national);
            }
        }
        fetchData();
    }, [national, option]);

    const getNewSongsRelease = async (national) => {
        const temp = await songService.getNewSongsRelease(national);
        setReleaseSongs(temp);
    }

    const getNewAlbumRelease = async (national) => {
        const temp = await albumService.getAllNewAlbumsRelease(national);
        setReleaseAlbums(temp);
    }

    const handlePlaySong = (index) => {
        if (option === 'songs') {
            if (playSongList !== releaseSongs) {
                addSongList(releaseSongs);
                changeSongIndex(index);
            }
        } else {
            if (playSongList !== releaseAlbums[index].songs) {
                addSongList(releaseAlbums[index].songs);
                changeSongIndex(0);
            }
        }
    };

    const columnSongs = [
        {
            key: 'index',
            header: '',
            render: (row, index) => (
                <Typography className={`No is-top-${index+1}`}
                            tag={'span'}>{index + 1}</Typography>
            ),
        },
        {
            key: 'name',
            header: 'Bài hát',
            render: (row) => (<Card sizeImg={60} long={true} srcImg={row.coverImageUrl} title={row.title}
                                    description={row.artists?.map((artist, index) => (
                                        <Link key={artist.artistId} to={"#"}>
                                            {artist.artistName}
                                            {index !==  row.artists.length - 1 && <span>, </span>}
                                        </Link>))}/>
            ),
        },
        {
            key: 'duration',
            header: '',
            render: (row) =>
                <Typography right tag="small" gd={{display: "block"}}>{((row.duration)/60).toFixed(2).replace('.', ':')}</Typography>,
        }
    ];

    const columnAlbums = [
        {
            key: 'index',
            header: '',
            render: (row, index) => (
                <Typography className={`No is-top-${index+1}`}
                            tag={'span'}>{index + 1}</Typography>
            ),
        },
        {
            key: 'name',
            header: 'Album',
            render: (row) => (<Card sizeImg={100} long={true} srcImg={row.coverImageUrl}
                                    title={<Link to={`/albums/${row.albumId}`} style={{
                                        padding: "0 20px",
                                        color: "var(--color-text)"
                                    }}
                                    >{row.title}</Link>}
                                    description={
                                        <Typography tag={'p'} gd={{padding: "0 20px"}}>
                                            {row.artists?.map((artist, index) => (
                                            <Link key={artist.artistId} to={"#"} >
                                                {artist.artistName}
                                                {index !==  row.artists.length - 1 && <span>, </span>}
                                            </Link>
                                            ))}
                                        </Typography>
                                    }
                                    className={"album-img"}
                               />
            ),
        },
        {
            key: 'dateCreate',
            header: 'Ngày phát hành',
            render: (row) =>
                <Typography center tag="small" gd={{display: "block"}}>{timeCalculate(row.dateCreate)}</Typography>,
        }
    ];

    const timeCalculate = (dateTimeString) => {
        const now = new Date();
        const commentDate = new Date(dateTimeString);

        // Chỉ lấy phần năm, tháng, ngày
        const nowDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const commentDateOnly = new Date(commentDate.getFullYear(), commentDate.getMonth(), commentDate.getDate());

        const differenceInDays = Math.floor((nowDateOnly - commentDateOnly) / (1000 * 60 * 60 * 24));

        if (differenceInDays === 0) {
            return 'Hôm nay';
        } else if (differenceInDays === 1) {
            return 'Hôm qua';
        } else if (differenceInDays < 30) {
            return `${differenceInDays} ngày trước`;
        } else if (differenceInDays < 365) {
            const months = Math.floor(differenceInDays / 30);
            return `${months} tháng trước`;
        } else {
            const years = Math.floor(differenceInDays / 365);
            return `${years} năm trước`;
        }
    };

    return (
        <Container withShadow={false} className={"new-release"}>
            <Typography tag="h1" className="title-m-chart">Mới Phát Hành</Typography>
            <Flex gap={8} className={'choice'}>
                <Link to={"/new-release/songs"} className={option === "songs" && "active"}>BÀI HÁT</Link>
                <Link to={"/new-release/albums"} className={option === "albums" && "active"}>Album</Link>
            </Flex>
            <Flex gd={{marginBottom:"30px"}} className={"national"}>
                <Typography tag="p" className={national === "" && "national-active"}
                            onClick={()=>setNational("")}>Tất cả</Typography>
                <Typography tag="p" className={national === "Việt Nam" && "national-active"}
                            onClick={()=>setNational("Việt Nam")}>Việt Nam</Typography>
                <Typography tag="p" className={national === "Âu Mỹ" && "national-active"}
                            onClick={()=>setNational("Âu Mỹ")}>Âu Mỹ</Typography>
                <Typography tag="p" className={national === "Hàn Quốc" && "national-active"}
                            onClick={()=>setNational("Hàn Quốc")}>Hàn Quốc</Typography>
            </Flex>
            {option === 'songs' ?
                <Group className="top-100">
                    {releaseSongs && <Table border={false} columns={columnSongs} data={releaseSongs} rowKey={"id"}
                                      className="custom-table" onClickRow={(index) => handlePlaySong(index)}
                    />}
                </Group>
                :
                <Group className="top-100">
                    {releaseAlbums && <Table border={false} columns={columnAlbums} data={releaseAlbums} rowKey={"id"}
                                      className="custom-table" onClickRow={(index) => handlePlaySong(index)}
                    />}
                </Group>
            }
        </Container>
    );
}