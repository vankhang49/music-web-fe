import {Card, Container, Flex, Grid, Group, Table, Typography} from "lvq";
import './MChart.scss'
import {LineChart} from "../../components/Chart/LineChart";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getTop100Songs} from "../../core/services/SongService";
import * as songService from "../../core/services/SongService";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import {Top10Week, top10Week} from "../../components/Top-10-week/Top10Week";

function MChart(props) {
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
            await getTop100Songs("");
        }
        fetchData();
    }, []);

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
            <Typography tag="h1" className="title-m-chart">M-Chart</Typography>
            <Group className="M-Chart">
                <LineChart/>
            </Group>
            <Group className="top-100">
                {top100 && <Table border={false} columns={columns} data={top100} rowKey={"id"}
                                  className="custom-table" onClickRow={(index) => handlePlaySong(index)}
                />}
            </Group>
            <Group className="top-week">
                <Typography tag={'h1'} gd={{fontSize: '2.7rem'}}>Bảng xếp hạng tuần</Typography>
                <Grid xs={1} sm={2} xl={3} gap={6}>
                    <Top10Week national={'Việt Nam'}/>
                    <Top10Week national={'Âu Mỹ'}/>
                    <Top10Week national={'Hàn Quốc'}/>
                </Grid>
            </Group>
        </Container>
    );
}

export default MChart;