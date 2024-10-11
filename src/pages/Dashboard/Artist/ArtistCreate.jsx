import {
    Avatar,
    Button,
    Container, Editor,
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
import {IoArrowBackSharp} from "react-icons/io5";
import {UploadOneImage} from "../../../firebase/UploadImage";
import {IoMdAdd} from "react-icons/io";
import * as artistService from "../../../core/services/ArtistService";
import {toast} from "react-toastify";
import * as genreService from "../../../core/services/GenreService";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import * as albumService from "../../../core/services/AlbumService";
import * as songService from "../../../core/services/SongService";
import {getArtistById} from "../../../core/services/ArtistService";


export function ArtistCreate(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [artist, setArtist] = useState({});
    const [biography, setBiography] = useState('');
    const [genres, setGenres] = useState([]);
    const [addGenres, setAddGenres] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [addAlbums, setAddAlbums] = useState([]);
    const [songs, setSongs] = useState([]);
    const [addSongs, setAddSongs] = useState([]);
    const [genresError, setGenresError] = useState(null);
    const [validateError, setValidateError] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm();

    useEffect(() => {
        const fetchData = async () => {
            await getAllGenres();
            await getAllAlbums();
            await getAllSongs();
        }
        fetchData();
    }, []);

    useEffect(()=> {
        if (id !== undefined) {
            const fetchData = async () => {
                await getArtistById(id);
            }
            fetchData();
        }
    }, [id])

    const getArtistById = async (artistId) => {
        const temp = await artistService.getArtistById(artistId);
        if (temp) {
            setArtist(temp);
            setValue("artistId", temp.artistId);
            setValue("artistName", temp.artistName);
            setValue("avatar", temp.avatar);
            setValue("biography", temp.biography);
            setValue("genres", temp.genres);
            setValue("songs", temp.songs);
            setValue("albums", temp.albums);
            setAvatar(temp.avatar);
            setAddGenres(temp.genres);
            setAddSongs(temp.songs);
            setAddAlbums(temp.albums);
            setBiography(temp.biography);
        }
    }

    const getAllGenres = async () => {
        const temp = await genreService.getAllGenre();
        setGenres(temp);
    }

    const getAllAlbums = async () => {
        const temp = await albumService.getAllAlbums();
        setAlbums(temp);
    }

    const getAllSongs = async () => {
        const temp = await songService.getAllSongs();
        setSongs(temp)
    }

    const handleOneImageUrlChange = async (uploadedImageUrl) => {
        setAvatar(uploadedImageUrl);
    }

    const handleRemoveImg = () => {
        setAvatar(null);
    }

    const onSubmit = async (data) => {
        data.genres = addGenres;
        data.biography = biography;
        data.avatar = avatar;
        data.songs = addSongs;
        data.albums = addAlbums;
        console.log(data);

        let flag = false;
        if (addGenres.length < 1) {
            flag = true;
            setValidateError({genres: "Thể loại không được để trống!"});
        }
        if (avatar === null) {
            flag = true;
            setValidateError({avatar: "Ảnh đại diện không được để trống!"})
        }
        if (flag === true) {
            return ;
        }
        try {
            if (id !== undefined) {
                await artistService.updateArtist(data);
            } else {
                await artistService.saveArtist(data);
            }
            toast.success("Thêm mới nghệ sĩ thành công!");
        } catch (e) {
            setValidateError(e.errorMessage);
            if(validateError) return toast.warn("Kiểm tra lại việc nhập!");
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

    const handlePopAlbum = (album) => {
        const parsedAlbum = JSON.parse(album);
        setAddAlbums(prevAlbums => prevAlbums.filter(a => a.title !== parsedAlbum.title));
    }

    const handleAddAlbums = (event) => {
        if (event.target.value === "") {
            return;
        }
        const album = JSON.parse(event.target.value);
        if (!addAlbums.some(a => a.title === album.title)) {
            setAddAlbums(prevAlbums => [...prevAlbums, album]);
        }
    }

    const handleAddSongs = (event) => {
        if (event.target.value === "") {
            return;
        }
        const song = JSON.parse(event.target.value);
        if (!addSongs.some(s => s.title === song.title)) {
            setAddSongs(prevSongs => [...prevSongs, song]);
        }
    }

    const handlePopSong = (song) => {
        const parsedSong = JSON.parse(song);
        setAddSongs(prevSongs => prevSongs.filter(s => s.title !== parsedSong.title));
    }

    const handleChangeBiography = (value) => {
        setBiography(value);
    }

    return (
        <Container>
            <Flex justifyContent='between'>
                <Typography tag="h1">Thêm mới nghệ sĩ</Typography>
                <Button text='Về danh sách' icon={<IoArrowBackSharp />} gap={1} onClick={() => navigate("/dashboard/artists")} />
            </Flex>
            <Group className='overflow-hidden'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid md={2} gap={4}>
                        <Label>
                            <Typography>Tên nghệ sĩ</Typography>
                            <Input size={4} placeholder="Tên nghệ sĩ"
                                   {...register("artistName", {
                                       required: "Không được để trống!"
                                   })}
                            />
                            <ErrorMessage condition={errors} message={errors?.artistName?.message} />
                            <ErrorMessage condition={validateError} message={validateError?.artistName}/>
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
                            </Flex>
                            <ErrorMessage condition={validateError} message={validateError?.genres}/>
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
                            <Typography>Hình ảnh đại diện</Typography>
                            <Flex>
                                <UploadOneImage className='form-label-child'
                                                onImageUrlChange={(url) => handleOneImageUrlChange(url)}/>
                            </Flex>
                            <ErrorMessage condition={validateError} message={validateError?.avatar}/>
                            <Flex justifyContent={'space-between'} alignItems="center" gd={{width: '100%', flexWrap: 'wrap'}}>
                                {avatar &&
                                    <Flex justifyContent="start" alignItems="center"
                                          gd={{
                                              position: "relative",
                                              width: 150,
                                              height: 150,
                                              borderRadius: 10,
                                              padding: 5,
                                              marginTop: 10
                                          }}>
                                        <Avatar shape={'square'} size={150} src={avatar} alt={avatar}
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
                            <Typography>Danh sách bài hát</Typography>
                            <Flex>
                                <Select size={4} onChange={(e) => handleAddSongs(e)}>
                                    <Option value="" text="-- Chọn bài hát --"></Option>
                                    {songs && songs.map((song) => (
                                        <Option key={song.songId} value={JSON.stringify(song)}
                                                text={song.title}></Option>
                                    ))}
                                </Select>
                            </Flex>
                            <ErrorMessage condition={validateError} message={validateError?.songs}/>
                            <div>
                                {addSongs && addSongs.map((song, index) => (
                                    <>
                                        <Typography>{song.title}</Typography>
                                        <Flex justifyContent="start" alignItems="center" key={song.songId}
                                              gd={{
                                                  position: "relative",
                                                  width: 300,
                                                  height: 40,
                                                  borderRadius: 10,
                                                  padding: 5,
                                                  marginTop: 10
                                              }}>
                                            <audio src={song.songUrl} autoPlay={false} controls={true}/>
                                            <Button className="pop-artist" size={1} gd={
                                                {
                                                    position: 'absolute',
                                                    right: -10,
                                                    top: -10,
                                                    backgroundColor: "#2f2739",
                                                    borderRadius: "50%",
                                                    color: "red"
                                                }}
                                                    onClick={() => handlePopSong(JSON.stringify(song))}
                                                    text={"X"}>X</Button>
                                        </Flex>
                                    </>
                                ))}
                            </div>
                        </Label>
                        <Label>
                            <Typography>Album</Typography>
                            <Flex>
                                <Select size={4} onChange={(e) => handleAddAlbums(e)}>
                                    <Option value="" text="-- Chọn Album --"></Option>
                                    {albums && albums.map((album) => (
                                        <Option key={album.albumId} value={JSON.stringify(album)}
                                                text={album.title}></Option>
                                    ))}
                                </Select>>
                            </Flex>
                            <ErrorMessage condition={validateError} message={validateError?.albums}/>
                            <Flex justifyContent={'space-between'} alignItems="center" gd={{width: '100%', flexWrap: 'wrap'}}>
                                {addAlbums && addAlbums.map((album, index) => (
                                    <Flex justifyContent="start" alignItems="center" key={album.albumId}
                                          gd={{
                                              position: "relative",
                                              minWidth: 150,
                                              maxWidth: 200,
                                              minHeight: 40,
                                              maxHeight: 100,
                                              borderRadius: 10,
                                              border: "1px solid #9b4de0",
                                              padding: 5,
                                              marginTop: 10
                                          }}>
                                        <Typography>{album.title}</Typography>
                                        <Button className="pop-artist" size={1} gd={
                                            {
                                                position: 'absolute',
                                                right: -10,
                                                top: -10,
                                                backgroundColor: "#2f2739",
                                                borderRadius: "50%",
                                                color: "red"
                                            }}
                                                onClick={() => handlePopAlbum(JSON.stringify(album))}
                                                text={"X"}>

                                        </Button>
                                    </Flex>
                                ))}
                            </Flex>
                        </Label>
                        <Label>
                            <Typography>Tiểu sử </Typography>
                            <Editor value={biography} onChange={handleChangeBiography}/>
                            <ErrorMessage condition={validateError} message={validateError?.biography}/>
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