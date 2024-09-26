import {Anchor, Button, Card, Container, Flex, Group, Table, Typography} from "lvq";
import {Link, useParams} from "react-router-dom";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import React, {useEffect, useState} from "react";
import * as songService from "../../core/services/SongService";
import "./TopWeek.scss";
import {FaPlayCircle} from "react-icons/fa";

export function TopWeek() {
    const {national} = useParams();

    const {
        playSongList,
        songIndexList,
        addSongList,
        changeSongIndex,
        toggleIsPlayingSong,
        isPlayingSong,
    } = usePlayMusic();

    const [top100, setTop100] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await getTop100Songs(national);
        }
        fetchData();
    }, [national]);

    const getTop100Songs = async (national) => {
        const temp = await songService.getTop100Songs(national);
        setTop100(temp);
    }

    const handlePlaySong = (index) => {
        if (playSongList !== top100) {
            addSongList(top100);
        }
        changeSongIndex(index);
    };

    const columns = [
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
    return (
        <Container withShadow={false}>
            <Typography tag="h1" className="title-m-chart"
                        gd={{fontSize: '3rem', fontWeight: 500, display: 'flex', alignItems: 'center', padding: '0 20px'}}
            >Bảng Xếp Hạng Tuần
                <Button theme={'reset'} onClick={()=>handlePlaySong(0)}
                        gd={{background: '#fff', height: 40, borderRadius: '100%', margin: '0 10px'}}
                        icon={<FaPlayCircle size={40} color={'#a317e6'}/>}></Button>
            </Typography>
            <Flex justifyContent={'start'} alignItems={'center'} className="national">
                <Anchor LinkComponent={Link} to={'/m-chart-week/Việt Nam'}
                        className={national === 'Việt Nam' && 'active'}
                 >Việt Nam</Anchor>
                <Anchor LinkComponent={Link} to={'/m-chart-week/Âu Mỹ'}
                        className={national === 'Âu Mỹ' && 'active'}
                >Âu Mỹ</Anchor>
                <Anchor LinkComponent={Link} to={'/m-chart-week/Hàn Quốc'}
                        className={national === 'Hàn Quốc' && 'active'}
                >Hàn Quốc</Anchor>
            </Flex>
            <Group className="top-100">
                {top100 && <Table border={false} columns={columns} data={top100} rowKey={"id"}
                                  className="custom-table" onClickRow={(index) => handlePlaySong(index)}
                />}
            </Group>
        </Container>
    );
}