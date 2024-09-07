import {Button, Card, cn, Container, Flex, Group, Modal, Typography} from "lvq";
import {LyricsPlay} from "../LyricsPlay/LyricsPlay";
import {useEffect, useState} from "react";
import {FaAngleDown, FaCommentDots} from "react-icons/fa";
import "./LyricAndComment.css";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import {CommentBox} from "../CommentBox/CommentBox";
import {IoPlaySkipBack, IoPlaySkipForward} from "react-icons/io5";

export function LyricAndComment({showLyrics}) {
    const {
        playSongList,
        songIndexList,
        isPlayingSong,
        audioRef,
        toggleIsPlayingSong,
        changeSongIndex
    } = usePlayMusic();
    const [isShowLyrics, setIsShowLyrics] = useState(showLyrics);
    const [isShowComment, setIsShowComment] = useState(false);
    const [activeButton, setActiveButton] = useState(1);
    const [unmountLyrics, setUnmountLyrics] = useState(false)

    useEffect(() => {
        setIsShowLyrics(showLyrics);
    }, [showLyrics]);

    const changeSongIndexWithCard = (index) => {
        if (index >= 0 && index < playSongList.length) {
            changeSongIndex(index);
        }
    };

    const handleUnmountShowLyrics = () => {
        setUnmountLyrics(true)
        setTimeout(() => {
            setIsShowLyrics(false);
            setUnmountLyrics(false)
        },900);
    }

    const handleCloseComment = () => {
        setIsShowComment(!isShowComment);
    }

    return (
        <Modal isOpen={isShowLyrics} onClose={handleUnmountShowLyrics} position="full"
               className={cn("LyricAndComment backdrop-blur mount", unmountLyrics && "unmount")}>
           <Flex center>
              <Flex center className={'button-header'} gd={window.innerWidth < 768 ? {marginTop: '15%', marginBottom: '15%'} : {}}>
                  <Button theme={'reset'} text="Danh sách phát" onClick={()=>setActiveButton(0)}
                          className={activeButton === 0 ? 'button-song active-button' : 'button-song'}></Button>
                  <Button theme={'reset'} text="Lời bài hát" onClick={()=>setActiveButton(1)}
                          className={activeButton === 1 ? 'button-song active-button' : 'button-song'}></Button>
              </Flex>
              <Flex justifyContent={'end'} alignItems={'center'}
                    gd={{
                        position: "absolute",
                        top: 15,
                        right: 15,
                    }}
              >
                  <Button theme="reset" text="" icon={<FaCommentDots size={22}/>}
                          className={"button-header"}
                          gd={{
                              borderRadius: '50%',
                              width: '40px',
                              height: '40px',
                              position: "relative",
                              top: '-30%'
                          }}
                          onClick={()=> setIsShowComment(!isShowComment)}
                  />
                  <Button theme="reset" text="" icon={<FaAngleDown size={22}/>}
                          className={"button-header"}
                          gd={{
                              borderRadius: '50%',
                              width: '40px',
                              height: '40px',
                              position: "relative",
                              top: '-30%'
                          }}
                          onClick={handleUnmountShowLyrics}
                  />
              </Flex>
          </Flex>
          <Flex justifyContent={'center'} gap={10} alignItems={'center'} gd={{width: '100%', height: '90vh'}}
                children={activeButton === 0 ? (
                    <Flex>
                        <Flex center gap={5}>
                            {songIndexList > 1 &&
                                <Card sizeImg={250} srcImg={playSongList[songIndexList-2]?.coverImageUrl}
                                      className="card-enter"
                                      gd={{textAlign: 'center', fontSize: '2rem', opacity: .5, transition: '0.3s ease-in-out'}}
                                      onClick={()=>changeSongIndexWithCard(songIndexList-2)}
                                      children={
                                          <Typography tag={'h5'} gd={{color: '#ccc'}}>{playSongList[songIndexList-2]?.title}</Typography>
                                      }
                                ></Card>
                            }
                            {songIndexList > 0 &&
                                <Card sizeImg={300} srcImg={playSongList[songIndexList-1]?.coverImageUrl}
                                      className="card-enter"
                                      gd={{textAlign: 'center', fontSize: '2rem', opacity: .5, transition: '0.3s ease-in-out'}}
                                      onClick={()=>changeSongIndexWithCard(songIndexList-1)}
                                      children={
                                          <Typography tag={'h5'} gd={{color: '#ccc'}}>{playSongList[songIndexList-1].title}</Typography>
                                      }
                                ></Card>
                            }
                            <Card sizeImg={window.innerWidth < 580 ? 300 : 400}
                                  srcImg={playSongList[songIndexList].coverImageUrl}
                                  className="card-enter current"
                                  gd={{textAlign: 'center', fontSize: '2rem', transition: '0.3s ease-in-out'}}
                                  children={
                                      <Typography tag={'h4'}>{playSongList[songIndexList].title}</Typography>
                                  }
                            ></Card>
                            {songIndexList < playSongList.length - 1 &&
                                <Card sizeImg={300} srcImg={playSongList[songIndexList+1]?.coverImageUrl}
                                      className="card-enter"
                                      gd={{textAlign: 'center', fontSize: '2rem', opacity: .5, transition: '0.3s ease-in-out'}}
                                      onClick={()=>changeSongIndexWithCard(songIndexList+1)}
                                      children={
                                          <Typography tag={'h5'} gd={{color: '#ccc'}}>{playSongList[songIndexList+1]?.title}</Typography>
                                      }
                                ></Card>
                            }
                            {songIndexList < playSongList.length - 2 &&
                                <Card sizeImg={250} srcImg={playSongList[songIndexList+2]?.coverImageUrl}
                                      className="card-enter"
                                      gd={{textAlign: 'center', fontSize: '2rem', opacity: .5, transition: '0.3s ease-in-out'}}
                                      onClick={()=>changeSongIndexWithCard(songIndexList+2)}
                                      children={
                                          <Typography tag={'h5'} gd={{color: '#ccc'}}>{playSongList[songIndexList+2]?.title}</Typography>
                                      }
                                ></Card>
                            }
                        </Flex>
                        {window.innerWidth < 580 &&
                            <Flex center gd={{position: "absolute", width: '100%', height: '100%', left: 0}}>
                                <Button theme="reset" text="" icon={<IoPlaySkipBack size={30}/>}
                                        className={"button-header"}
                                        gd={{
                                            borderRadius: '50%',
                                            width: '50px',
                                            height: '50px',
                                            position: "absolute",
                                            left: 0
                                        }}
                                        onClick={()=> changeSongIndexWithCard(songIndexList-1)}
                                />
                                <Button theme="reset" text="" icon={<IoPlaySkipForward size={30}/>}
                                        className={"button-header"}
                                        gd={{
                                            borderRadius: '50%',
                                            width: '50px',
                                            height: '50px',
                                            position: "absolute",
                                            right: 0
                                        }}
                                        onClick={()=> changeSongIndexWithCard(songIndexList+1)}
                                />
                            </Flex>
                        }
                    </Flex>
                    ):(
                        <LyricsPlay></LyricsPlay>
                    )
                }>
          </Flex>
          <CommentBox openComment={isShowComment} callOpenComment={handleCloseComment}></CommentBox>
      </Modal>
    );
}