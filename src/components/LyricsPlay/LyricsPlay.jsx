import {Avatar, Button, Flex} from "lvq";
import {useEffect, useRef, useState} from "react";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import "./LyricsPlay.css";
import {FaPlay} from "react-icons/fa";
import wave from "../../assets/gif/icon-playing.gif"

export function LyricsPlay({showLyrics}) {
    const {
        playSongList,
        songIndexList,
        isPlayingSong,
        audioRef,
        toggleIsPlayingSong,
        changeSongIndex
    } = usePlayMusic();

    const [isShowLyrics, setIsShowLyrics] = useState(showLyrics);
    const lyricsRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        setIsShowLyrics(showLyrics);
    }, [showLyrics]);

    useEffect(() => {
        if (isPlayingSong && audioRef.current) {
            const interval = setInterval(() => {
                setCurrentTime(audioRef.current.currentTime); // Lấy currentTime từ audioRef chính xác hơn
            }, 50); // Giảm thời gian interval để cập nhật thường xuyên hơn

            return () => clearInterval(interval);
        }
    }, [isPlayingSong, audioRef]);

    useEffect(() => {
        if (isPlayingSong) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlayingSong]);

    const extractLyrics = (htmlLyrics) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlLyrics, 'text/html');
        const lyrics = Array.from(doc.querySelectorAll('p')).map(p => p.textContent.trim());
        return lyrics.filter(line => line.length > 0); // Remove empty lines
    };

    const htmlLyrics = playSongList[songIndexList].lyrics;  // Your lyrics data in HTML
    const lyrics = extractLyrics(htmlLyrics);

    const syncLyricsWithTime = (lyrics, songDuration) => {
        // Có thể điều chỉnh timePerLine hoặc lấy dữ liệu thời gian từng dòng nếu có
        const timePerLine = songDuration / lyrics.length;
        return lyrics.map((line, index) => ({
            time: index * timePerLine, // Hoặc dữ liệu thời gian chính xác của từng dòng
            content: line
        }));
    };

    const songDuration = playSongList[songIndexList].duration; // Song total duration in seconds
    const lyricsWithTime = syncLyricsWithTime(lyrics, songDuration);

    const findCurrentLyric = () => {
        for (let i = 0; i < lyricsWithTime.length; i++) {
            if (currentTime >= lyricsWithTime[i].time &&
                (i === lyricsWithTime.length - 1 || currentTime < lyricsWithTime[i + 1].time)) {
                return i;
            }
        }
        return 0;
    };

    const currentLyricIndex = findCurrentLyric();

    useEffect(() => {
        if (lyricsRef.current) {
            const lyricElements = lyricsRef.current.children;
            if (lyricElements[currentLyricIndex]) {
                lyricElements[currentLyricIndex].scrollIntoView({behavior: "smooth", block: "center"});
            }
        }
    }, [currentLyricIndex]);

    const handlePlaySong = () => {
        isPlayingSong ? toggleIsPlayingSong(false) : toggleIsPlayingSong(true);
    }
    return (
        <Flex justifyContent={'center'} flexWrap={'wrap'} gap={10} alignItems={'center'}
              gd={{width: '100%', height: '90vh'}}
              children={
                  <>
                      <Flex className={isPlayingSong  ? 'audio-card active' : 'audio-card'}>
                          <Avatar shape={window.innerWidth < 768 ? 'circle' : 'square'}
                                  size={window.innerWidth < 768 ? 300 : 400}
                                  className={'audio-image'}
                                  src={playSongList[songIndexList].coverImageUrl}></Avatar>
                          <Flex justifyContent={"center"} alignItems={'center'}
                                className={'audio-play'}
                                gd={window.innerWidth < 768 ? {borderRadius: '50%'} : {}}
                          >
                              <Button theme={'reset'}
                                      onClick={handlePlaySong}
                                      icon={
                                  isPlayingSong ? <img src={wave} height={40} alt="wave"/>
                                  : <FaPlay size={30} style={{paddingLeft: 5}} color={"white"}/>
                              }></Button>
                          </Flex>
                      </Flex>
                      <div className='lyrics-content' ref={lyricsRef} style={
                          window.innerWidth < 768 ?
                              {
                                  width: '100%',
                                  height: '50vh', // Limits the visible area
                                  overflow: 'auto',
                                  fontSize: '1.6rem',
                                  scrollBehavior: 'smooth',
                              }
                              :
                              {
                                  width: '50%',
                                  height: '50vh', // Limits the visible area
                                  overflow: 'auto',
                                  fontSize: '1.6rem',
                                  scrollBehavior: 'smooth',
                              }
                      }>
                          {/*// dangerouslySetInnerHTML={{__html: playSongList[songIndexList]?.lyrics}}>*/}
                          {lyricsWithTime.map((lyric, index) => (
                              <p
                                  key={index}
                                  className={index === currentLyricIndex ? 'highlight' : ''}
                                  style={{
                                      opacity: index === currentLyricIndex ? 1 : 0.5,
                                      transition: 'opacity 0.3s ease',
                                  }}
                              >
                                  {lyric.content}
                              </p>
                          ))}
                      </div>
                  </>
              }>
        </Flex>
    );
}