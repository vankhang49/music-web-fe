import {Button, Card, Flex} from "lvq";
import {Link} from "react-router-dom";
import {IoIosHeart} from "react-icons/io";
import React from "react";
import * as favoriteService from "../../core/services/FavoriteService";
import "./Card.scss";
import wave from "../../assets/gif/icon-playing.gif";
import {FaPlay} from "react-icons/fa";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import {HiOutlineDotsHorizontal} from "react-icons/hi";

export default function AlbumCard({album, key}) {
    const {
        playSongList,
        songIndexList,
        albumOrPlaylistId,
        addSongList,
        changeSongIndex,
        toggleIsPlayingSong,
        isPlayingSong,
        setAlbumPlaylistId
    } = usePlayMusic();

    const addNewFavoriteAlbum = async (album) => {
        await favoriteService.addFavoriteAlbum(album);
    }

    const handlePlayAlbum = (index) => {
        addSongList(album.songs)
        changeSongIndex(0);
        setAlbumPlaylistId(index);
    }

    const handlePlayAndPauseAlbum = () => {
        isPlayingSong ? toggleIsPlayingSong(false) : toggleIsPlayingSong(true);
    }

    return (
            <Card srcImg={album.coverImageUrl} key={key} id={"albumCard"} gd={{position:"relative"}}
                  className={`albumCard ${albumOrPlaylistId === album.albumId && isPlayingSong ? "active" : ""}`}
                  title={album.title.length > 17 ? `${album.title.substring(0, 15)}...` : album.title}
                  urlLink={`/albums/${album.albumId}`}
                  LinkComponent={Link} description={album.provide}
                  children={
                      <Flex justifyContent={"center"} alignItems={"center"} className={'action-menu'}>
                          <Button className={'card-icon heart'} type={'button'}
                                  theme={'reset'} icon={<IoIosHeart size={22} fill={"white"}/>}
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      addNewFavoriteAlbum(album)
                                  }}
                          >
                          </Button>
                          {
                              albumOrPlaylistId === album.albumId ?
                                  <Button theme={'reset'} className={'card-icon play'}
                                          onClick={handlePlayAndPauseAlbum}
                                          icon={
                                              isPlayingSong ? <img src={wave} height={30} alt="wave"/>
                                                  : <FaPlay size={30} style={{paddingLeft: 5}} fill={"white"}/>
                                          }
                                          gd={{border: 'none'}}
                                  >
                                  </Button>
                                  :
                                  <Button theme={'reset'} className={'card-icon play'}
                                          onClick={() => handlePlayAlbum(album.albumId)}
                                          icon={<FaPlay size={30} style={{paddingLeft: 5}} fill={"white"}/>}
                                          gd={{border: 'none'}}
                                  >
                                  </Button>
                          }
                          <Button className={'card-icon menu'} theme={'reset'} id={`active-album-menu-${album.albumId}`}
                                  icon={<HiOutlineDotsHorizontal size={22} fill={"white"}/>}></Button>
                      </Flex>
                  }
            >
            </Card>
    );
}