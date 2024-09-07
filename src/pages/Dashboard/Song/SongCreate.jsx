import {
    Avatar,
    Button,
    Container,
    Editor,
    ErrorMessage,
    Flex,
    Form,
    Grid,
    Group,
    Input,
    Label,
    Option,
    Select,
    Typography
} from "lvq";
import {useForm} from "react-hook-form"
import {useNavigate, useParams} from "react-router-dom";
import {IoArrowBackSharp} from "react-icons/io5";
import {IoMdAdd} from "react-icons/io";
import {useEffect, useState} from "react";
import * as genreService from "../../../core/services/GenreService";
import * as artistService from "../../../core/services/ArtistService";
import * as albumService from "../../../core/services/AlbumService";
import {toast} from "react-toastify";
import {UploadOneImage} from "../../../firebase/UploadImage";
import {UploadMp3} from "../../../firebase/UploadMp3";
import * as songService from "../../../core/services/SongService";

function SongCreate() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [song, setSong] = useState({});
    const [description, setDescription] = useState('');
    const [lyrics, setLyrics] = useState('');
    const [artists, setArtists] = useState([]);
    const [genre, setGenre] = useState({});
    const [genres, setGenres] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [addGenres, setAddGenres] = useState([]);
    const [genresError, setGenresError] = useState(null);
    const [validateError, setValidateError] = useState([]);
    const [coverImageUrl, setCoverImageUrl] = useState(null);
    const [mp3Url, setMp3Url] = useState(null);
    const [addArtists, setAddArtists] = useState([]);
    const [artistsError, setArtistsError] = useState(null);
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({

    });

    useEffect(() => {
        const fetchData = async () => {
            await getAllGenres();
            await getAllAlbums();
            await getAllArtists();
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            const fetchData = async () => {
                await getSongById(id);
            }
            fetchData();
        }
    }, [id])

    const getSongById = async (songId) => {
        const temp = await songService.getSongById(songId);
        if (temp) {
            setSong(temp);
            setValue("songId", temp.songId);
            setValue("title", temp.title);
            setValue("songUrl", temp.songUrl);
            setValue("coverImageUrl", temp.coverImageUrl);
            setValue("duration", temp.duration);
            setValue("lyrics", temp.lyrics);
            setValue("dateCreate", temp.dateCreate);
            setValue("album", JSON.stringify(temp.album));
            setValue("artists", temp.artists);
            setValue("genres", temp.genres);
            setAddArtists(temp.artists);
            setAddGenres(temp.genres);
            setLyrics(temp.lyrics);
            setCoverImageUrl(temp.coverImageUrl);
            setMp3Url(temp.songUrl);

        }
    }

    const getAllGenres = async () => {
        const temp = await genreService.getAllGenre();
        setGenres(temp);
    }

    const getAllArtists = async () => {
        const temp = await artistService.getAllArtist();
        setArtists(temp);
    }

    const getAllAlbums = async () => {
        const temp = await albumService.getAllAlbums();
        setAlbums(temp);
    }

    const handleOneImageUrlChange = async (uploadedImageUrl) => {
        setCoverImageUrl(uploadedImageUrl);
    }

    const handleRemoveImg = () => {
        setCoverImageUrl(null);
    }

    const handleOneMp3UrlChange = async (uploadedMp3Url) => {
        setMp3Url(uploadedMp3Url);
    }

    const handleRemoveMp3 = () => {
        setMp3Url(null);
    }

    const handleAddArtists = (event) => {
        if (event.target.value === "") {
            return;
        }
        const artist = JSON.parse(event.target.value);
        if (!addArtists.some(a => a.artistName === artist.artistName)) {
            setAddArtists(prevArtists => [...prevArtists, artist]);
        }
    }

    const handlePopArtist = (artist) => {
        const parsedArtist = JSON.parse(artist);
        setAddArtists(prevArtists => prevArtists.filter(a => a.artistName !== parsedArtist.artistName));
    }

    const onSubmit = async (data) => {
        data.genres = addGenres;
        data.artists = addArtists;
        data.lyrics = lyrics;
        data.coverImageUrl = coverImageUrl;
        data.songUrl = mp3Url;
        if (data.album === '') {
            data.album = null;
        } else {
            data.album = JSON.parse(data.album)
        }
        console.log(data);
        try {
            if (id !== undefined) {
              await songService.updateSong(data);
            } else {
                await songService.saveSong(data);
            }
            toast.success("Thêm mới bài hát thành công!");
        } catch (e) {
            toast.error("Thêm mới thất bại!");
        }
    }

    const handleAddGenre = (event) => {
        if (event.target.value === "") {
            return;
        }
        const genre = JSON.parse(event.target.value);
        if (!addGenres.some(g => g.genreName === genre.genreName)) {
            setAddGenres(prevGenres => [...prevGenres, genre]);
        }
    }

    const handlePopGenre = (genre) => {
        const parsedGenre = JSON.parse(genre);
        setAddGenres(prevGenres => prevGenres.filter(g => g.genreName !== parsedGenre.genreName));
    }

    const handleChangeLyrics = (value) => {
        setLyrics(value);
    }

    return (
        <Container>
                <Flex justifyContent='between'>
                    <Typography tag="h1">Thêm mới bài hát</Typography>
                    <Button text='Về danh sách' icon={<IoArrowBackSharp />} gap={1} onClick={() => navigate("/dashboard/songs")} />
                </Flex>
                <Group className='overflow-hidden'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Grid md={2} gap={4}>
                            <Label>
                                <Typography>Tên bài hát</Typography>
                                <Input size={4} placeholder="Tên bài hát"
                                       {...register("title", {
                                           required: "Không được để trống!"
                                       })}
                                />
                                <ErrorMessage />
                            </Label>
                            <Label>
                                <Typography>Nghệ sĩ thực hiện</Typography>
                                <Flex>
                                    <Select size={4} onChange={(e) => handleAddArtists(e)}>
                                        <Option value="" text="-- Chọn nghệ sĩ --"></Option>
                                        {artists && artists.map((artist) => (
                                            <Option key={artist.artistId}
                                                    value={JSON.stringify(artist)} text={artist.artistName}></Option>
                                        ))}
                                    </Select>
                                    <ErrorMessage />
                                </Flex>
                                <Flex justifyContent={'space-between'} alignItems="center" gd={{width: '100%', flexWrap: 'wrap'}}>
                                    {addArtists && addArtists.map((artist, index) => (
                                        <Flex justifyContent="start" alignItems="center" key={artist.artistId}
                                              gd={{
                                                  position: "relative",
                                                  width: 150,
                                                  height: 40,
                                                  borderRadius: 10,
                                                  border: "1px solid #9b4de0",
                                                  padding: 5,
                                                  marginTop: 10
                                                }}>
                                            <Typography>{artist.artistName}</Typography>
                                            <Button className="pop-artist" size={1} gd={
                                                {
                                                    position: 'absolute',
                                                    right: -10,
                                                    top: -10,
                                                    backgroundColor: "#2f2739",
                                                    borderRadius: "50%",
                                                    color: "red"
                                                }}
                                                  onClick={() => handlePopArtist(JSON.stringify(artist))}
                                                    text={"X"}>
                                            </Button>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Label>
                            <Label>
                                <Typography>Hình ảnh bìa</Typography>
                                <Flex>
                                    <UploadOneImage className='form-label-child'
                                                    onImageUrlChange={(url) => handleOneImageUrlChange(url)}/>
                                    <ErrorMessage />
                                </Flex>
                                <Flex justifyContent={'space-between'} alignItems="center" flexWrap="wrap">
                                    {coverImageUrl &&
                                        <Flex justifyContent="start" alignItems="center"
                                              gd={{
                                                  position: "relative",
                                                  width: 150,
                                                  height: 150,
                                                  borderRadius: 10,
                                                  padding: 5,
                                                  marginTop: 10
                                              }}>
                                            <Avatar shape={'square'} size={150} src={coverImageUrl} alt={coverImageUrl}
                                            gd={{borderRadius: 10}}/>
                                            <Button className="pop-artist" size={1} gd={
                                                {
                                                    position: 'absolute',
                                                    right: -10,
                                                    top: -10,
                                                    backgroundColor: "#2f2739",
                                                    borderRadius: "50%",
                                                    color: "red"
                                                }}
                                                    onClick={handleRemoveImg}
                                                    text={"X"}>
                                            </Button>
                                        </Flex>
                                    }
                                </Flex>
                            </Label>
                            <Label>
                                <Typography>Thể loại</Typography>
                                <Flex>
                                    <Select size={4} onChange={(e) => handleAddGenre(e)}>
                                        <Option value="" text="-- Thể loại --"></Option>
                                        {genres && genres.map((genre) => (
                                            <Option key={genre.genreId}
                                                    value={JSON.stringify(genre)} text={genre.genreName}></Option>
                                        ))}
                                    </Select>
                                    <ErrorMessage />
                                </Flex>
                                <Flex justifyContent={'space-between'} alignItems="center" gd={{width: '100%', flexWrap: 'wrap'}}>
                                    {addGenres && addGenres.map((genre, index) => (
                                        <Flex justifyContent="start" alignItems="center" key={genre.genreId}
                                              gd={{
                                                  position: "relative",
                                                  width: 150,
                                                  height: 40,
                                                  borderRadius: 10,
                                                  border: "1px solid #9b4de0",
                                                  padding: 5,
                                                  marginTop: 10
                                              }}>
                                            <Typography>{genre.genreName}</Typography>
                                            <Button className="pop-artist" size={1} gd={
                                                {
                                                    position: 'absolute',
                                                    right: -10,
                                                    top: -10,
                                                    backgroundColor: "#2f2739",
                                                    borderRadius: "50%",
                                                    color: "red"
                                                }}
                                                    onClick={() => handlePopGenre(JSON.stringify(genre))}
                                                    text={"X"}>

                                            </Button>
                                        </Flex>
                                    ))}
                                </Flex>
                            </Label>
                            <Label>
                                <Typography>Bài hát</Typography>
                                <Flex>
                                    <UploadMp3 className='form-label-child'
                                               onMp3UrlChange={(url) => handleOneMp3UrlChange(url)}/>
                                    <ErrorMessage />
                                </Flex>
                                <Flex justifyContent={'space-between'} alignItems="center" gd={{width: '100%', flexWrap: 'wrap'}}>
                                    {mp3Url &&
                                        <Flex justifyContent="start" alignItems="center" key={genre.genreId}
                                              gd={{
                                                  position: "relative",
                                                  width: 300,
                                                  height: 40,
                                                  borderRadius: 10,
                                                  padding: 5,
                                                  marginTop: 10
                                              }}>
                                            <audio src={mp3Url} autoPlay={false} controls={true}/>
                                            <Button className="pop-artist" size={1} gd={
                                                {
                                                    position: 'absolute',
                                                    right: -10,
                                                    top: -10,
                                                    backgroundColor: "#2f2739",
                                                    borderRadius: "50%",
                                                    color: "red"
                                                }}
                                                    onClick={handleRemoveMp3}
                                                    text={"X"}>X</Button>
                                        </Flex>
                                    }
                                </Flex>
                            </Label>
                            <Label>
                                <Typography>Thời lượng</Typography>
                                <Input size={4} placeholder="Thời lượng bài hát" type="number"
                                       {...register("duration", {
                                           required: "Không được để trống!"
                                       })}
                                />
                                <ErrorMessage />
                            </Label>
                            <Label>
                                <Typography>Lời bài hát</Typography>
                                <Editor value={lyrics} onChange={handleChangeLyrics}/>
                            </Label>
                            <Label>
                                <Typography>Album</Typography>
                                <Select size={4} {...register("album")}>
                                    <Option value="" text="-- Chọn Album --"></Option>
                                    {albums && albums.map((album) => (
                                        <Option key={album.albumId} value={JSON.stringify(album)}
                                                text={album.title}></Option>
                                    ))}
                                </Select>
                                <ErrorMessage />
                            </Label>
                        </Grid>
                        <Flex className="form-btn-mt">
                            <Button type="submit" text="Thêm mới" size={4} icon={<IoMdAdd />} gap={1}/>
                        </Flex>
                    </Form>
                </Group>
            </Container>
    );
}

export default SongCreate;