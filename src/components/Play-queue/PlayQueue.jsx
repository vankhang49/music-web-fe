import {Button, Card, Container, Flex, Group, Typography} from "lvq";
import {useEffect, useState} from "react";
import "./PlayQueue.css";
import {FaAngleDown, FaCommentDots, FaPlay} from "react-icons/fa";
import {LuAlarmClock} from "react-icons/lu";
import {HiMiniEllipsisHorizontal} from "react-icons/hi2";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import {calcLength} from "framer-motion";
import wave from "../../assets/gif/icon-playing.gif";

export function PlayQueue({showPlayList}) {
    const [isOpenQueue, setIsOpenQueue] = useState(showPlayList);
    const [activeButton, setActiveButton] = useState(1);
    const {
        playSongList,
        songIndexList,
        isPlayingSong,
        audioRef,
        toggleIsPlayingSong,
        changeSongIndex
    } = usePlayMusic();

    useEffect(() => {
        setIsOpenQueue(showPlayList);
    }, [showPlayList]);

    const handlePlaySongIndex = (index) => {
        changeSongIndex(index);
    }

    const handlePlaySong = () => {
        isPlayingSong ? toggleIsPlayingSong(false) : toggleIsPlayingSong(true);
    }
    return (
        <Container withShadow={false} className={isOpenQueue ? 'queue active-queue' : 'queue'}>
            <Flex center gd={{height: '5vh', position: 'fixed'}}>
                <Flex center className={'button-header'}>
                    <Button theme={'reset'} text="Danh sách phát" onClick={() => setActiveButton(0)}
                            className={activeButton === 0 ? 'button-song active-button' : 'button-song'}></Button>
                    <Button theme={'reset'} text="Nghe gần đây" onClick={() => setActiveButton(1)}
                            className={activeButton === 1 ? 'button-song active-button' : 'button-song'}></Button>
                </Flex>

                <Button theme="reset" text="" icon={<LuAlarmClock size={22}/>}
                        className={"button-header"}
                        gd={{
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            position: "relative",
                        }}
                />
                <Button theme="reset" text="" icon={<HiMiniEllipsisHorizontal size={22}/>}
                        className={"button-header"}
                        gd={{
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            position: "relative",
                        }}
                />
            </Flex>
            <Group className={'queue-content'} gd={{marginTop: '5vh', height: '80vh', overflowY: 'auto'}}>
                <Group gd={{padding: '10px 0'}}>

                    {playSongList.map((song, index) => (
                        index < songIndexList &&
                        <Flex className={'audio-card'}>
                            <Card srcImg={song.coverImageUrl}
                                  key={song.songId}
                                  title={song?.title}
                                  long description={
                                song?.artists.map((artist, index) => (
                                    <Typography tag={"span"} gd={{fontSize: '.8rem'}} key={artist.artistId}>
                                        {artist.artistName}
                                        {index !== song.artists.length - 1 && <Typography tag={'span'}>, </Typography>}
                                    </Typography>
                                ))} sizeImg={56}
                                  gd={{margin: '5px 0', opacity: .7}}
                                  onClick={() => handlePlaySongIndex(index)}
                            >
                            </Card>
                            <Flex justifyContent={"center"} alignItems={'center'}
                                  className={'audio-play'}
                                  gd={{width: 56, height: 56, margin: '5px 0'}}
                            >
                                <Button theme={'reset'}
                                        onClick={() => handlePlaySongIndex(index)}
                                        icon={<FaPlay size={20} style={{paddingLeft: 5}} color={"white"}/>}>
                                </Button>
                            </Flex>
                        </Flex>
                    ))}

                    <Group className={'current-song'} gd={{position: 'sticky', top: 0}}>
                        <Flex className={isPlayingSong ? 'audio-card active' : 'audio-card'}>
                            <Card className={'song'}
                                  srcImg={playSongList[songIndexList].coverImageUrl}
                                  title={<Typography tag={"p"} gd={{fontSize: '.9rem'}}>
                                      {playSongList[songIndexList]?.title}</Typography>}
                                  long description={
                                playSongList[songIndexList]?.artists.map((artist, index) => (
                                    <Typography tag={"span"} gd={{fontSize: '.8rem'}} key={artist.artistId}>
                                        {artist.artistName}
                                        {index !== playSongList[songIndexList].artists.length - 1 &&
                                            <Typography tag={'span'}>, </Typography>}
                                    </Typography>
                                ))} sizeImg={56}
                                  gd={{padding: 5}}
                            >
                            </Card>
                            <Flex justifyContent={"center"} alignItems={'center'}
                                  className={'audio-play'}
                                  gd={{width: 56, height: 56, margin: '11px 5px'}}
                            >
                                <Button theme={'reset'}
                                        onClick={handlePlaySong}
                                        icon={
                                            isPlayingSong ? <img src={wave} height={20} alt="wave"/>
                                                : <FaPlay size={20} style={{paddingLeft: 5}} color={"white"}/>
                                        }>

                                </Button>
                            </Flex>
                        </Flex>
                        <Typography tag={'p'} gd={{fontSize: '.8rem'}}>Tiếp theo</Typography>
                        <Typography tag={'p'} gd={{fontSize: '.9rem', color: '#cf10b5', marginBottom: 10}}>Top 100 Bài
                            hát</Typography>
                    </Group>
                </Group>
                <Group className={'next-song'}>

                    {playSongList.map((song, index) => (
                        index > songIndexList &&
                        <Flex className={'audio-card'}>
                            <Card srcImg={song.coverImageUrl}
                                  key={song.songId}
                                  title={song?.title}
                                  long description={
                                song?.artists.map((artist, index) => (
                                    <Typography tag={"span"} gd={{fontSize: '.8rem'}} key={artist.artistId}>
                                        {artist.artistName}
                                        {index !== song.artists.length - 1 && <Typography tag={'span'}>, </Typography>}
                                    </Typography>
                                ))} sizeImg={56}
                                  gd={{margin: '5px 0'}}
                                  onClick={() => handlePlaySongIndex(index)}
                            >
                            </Card>
                            <Flex justifyContent={"center"} alignItems={'center'}
                                  className={'audio-play'}
                                  gd={{width: 56, height: 56, margin: '5px 0'}}
                            >
                                <Button theme={'reset'}
                                        onClick={() => handlePlaySongIndex(index)}
                                        icon={<FaPlay size={20} style={{paddingLeft: 5}} color={"white"}/>}>
                                </Button>
                            </Flex>
                        </Flex>
                    ))}

                </Group>
            </Group>
        </Container>
    );
}