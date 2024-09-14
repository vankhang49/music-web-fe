import {Button, Card, Container, Flex, Group, Table, Typography} from "lvq";
import {FaPlayCircle} from "react-icons/fa";
import "./Top10Week.css";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import * as songService from "../../core/services/SongService";

export function Top10Week({national}) {
    const {
        playSongList,
        songIndexList,
        addSongList,
        changeSongIndex,
        toggleIsPlayingSong,
        isPlayingSong,
    } = usePlayMusic();

    const [top100, setTop100] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getTop100Songs(national, 5);
        }
        fetchData();
    }, []);

    const getTop100Songs = async (national, size) => {
        const temp = await songService.getTop100Songs(national, size);
        setTop100(temp);
    }

    const handlePlaySong = (index) => {
        if (playSongList !== top100) {
            addSongList(top100);
        }
        changeSongIndex(index);
    };

    const handleChangePageTop = () => {
        navigate(`/m-chart-week/${national}`);
    }

    const columns = [
        {
            key: 'index',
            header: '',
            render: (row, index) => (
                <Typography className={`No is-top-${index + 1}`}
                            tag={'span'}>{index + 1}</Typography>
            ),
        },
        {
            key: 'name',
            header: '',
            render: (row) => (<Card sizeImg={60} long={true} srcImg={row.coverImageUrl} title={row.title}
                                    description={row.artists?.map((artist, index) => (
                                        <Link key={artist.artistId} to={"#"}>
                                            {artist.artistName}
                                            {index !== row.artists.length - 1 && <span>, </span>}
                                        </Link>))}/>
            ),
        },
        {
            key: '',
            header: '',
            render: (row) =>
                <Typography right tag="small"
                            gd={{display: "block"}}>{((row.duration) / 60).toFixed(2).replace('.', ':')}</Typography>,
        }
    ];

    return (
        <Container withShadow={false} className={'top-10-week'}>
            <Typography tag={'span'}
                        gd={{fontSize: '2rem', fontWeight: 500, display: 'flex', padding: '0 20px'}}>{national}
                <Button theme={'reset'}
                        gd={{background: '#fff', borderRadius: '100%', margin: 5}}
                        icon={<FaPlayCircle size={35} color={'#a317e6'}/>}></Button>
            </Typography>
            <Group className="top-100">
                {top100 && <Table border={false} columns={columns} data={top100} rowKey={"id"}
                                  className="custom-table" onClickRow={(index) => handlePlaySong(index)}
                />}
            </Group>
            <Flex center className="show-more">
                {top100.length >= 5 &&
                    <Button text={'Xem tất cả'}
                            onClick={handleChangePageTop}
                    ></Button>
                }
            </Flex>
        </Container>
    );
}