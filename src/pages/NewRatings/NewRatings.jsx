import {Card, Container, Group, Table, Typography} from "lvq";
import React, {useEffect, useState} from "react";
import * as songService from "../../core/services/SongService";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import {Link} from "react-router-dom";

export function NewRatings() {
    const {
        playSongList,
        addSongList,
        changeSongIndex,
    } = usePlayMusic();

    const [new100, setNew100] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getNew100Songs();
        }
        fetchData();
    }, []);

    const getNew100Songs = async () => {
        const temp = await songService.getNew100Songs();
        setNew100(temp);
    }

    const handlePlaySong = (index) => {
        if (playSongList !== new100) {
            addSongList(new100);
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
            <Typography tag="h1" className="title-m-chart">BXH Nhạc Mới</Typography>
            <Group className="top-100">
                {new100 && <Table border={false} columns={columns} data={new100} rowKey={"id"}
                                  className="custom-table" onClickRow={(index) => handlePlaySong(index)}
                />}
            </Group>
        </Container>
    );
}