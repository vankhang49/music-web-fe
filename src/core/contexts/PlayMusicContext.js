import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {songsData} from "../../data";

const PlayMusicContext = createContext();

export const PlayMusicProvider = ({ children }) => {
    const [isPlayingSong, setIsPlayingSong] = useState(false);
    const [playSongList, setPlaySongList] = useState([]);
    const [albumOrPlaylistId, setAlbumOrPlaylistId] = useState(null);
    const [songIndexList, setSongIndexList] = useState(0);
    const audioRef = useRef();

    const addSongList = (songs) => {
        setPlaySongList(songs);
    };

    const setAlbumPlaylistId = (id) => {
        setAlbumOrPlaylistId(id);
    }

    const toggleIsPlayingSong = (state) => {
        setIsPlayingSong(state);
        (state) ? audioRef.current.play() : audioRef.current.pause();
    };

    const changeSongIndex = (index) => {
        setSongIndexList(index);
        setIsPlayingSong(true);
    };

    return (
        <PlayMusicContext.Provider value={{
            isPlayingSong,
            playSongList,
            songIndexList,
            audioRef,
            albumOrPlaylistId,
            addSongList,
            toggleIsPlayingSong,
            changeSongIndex,
            setAlbumPlaylistId
        }}>
            {children}
        </PlayMusicContext.Provider>
    );
};

export const usePlayMusic = () => useContext(PlayMusicContext);