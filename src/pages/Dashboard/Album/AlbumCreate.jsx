import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as genreService from "../../../core/services/GenreService";
import * as artistService from "../../../core/services/ArtistService";
import * as albumService from "../../../core/services/AlbumService";
import * as songService from "../../../core/services/SongService";
import {toast} from "react-toastify";
import {
    Avatar,
    Button, Container,
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
import {IoArrowBackSharp} from "react-icons/io5";
import {UploadOneImage} from "../../../firebase/UploadImage";
import {UploadMp3} from "../../../firebase/UploadMp3";
import {IoMdAdd} from "react-icons/io";
import {getAllAlbums} from "../../../core/services/AlbumService";


export function AlbumCreate() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [album, setAlbum] = useState({});
    const [addArtists, setAddArtists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [coverImageUrl, setCoverImageUrl] = useState(null);
    const [artistsError, setArtistsError] = useState(null);
    const [songsError, setSongsError] = useState(null);
    const [validateError, setValidateError] = useState([]);
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({

    });

    useEffect(() => {
        const fetchData = async () => {
            await getAllArtists();
        }
        fetchData();
    }, []);

    useEffect(()=> {
        const fetchData = async () => {
            if (id !== undefined) {
                await getAlbumById(id);
            }
        }
        fetchData();
    }, [id])

    const getAlbumById = async (albumId) => {
        const temp = await albumService.getAlbumById(albumId);
        if (temp) {
            setAlbum(temp);
            setValue("albumId", temp.albumId);
            setValue("title", temp.title);
            setValue("coverImageUrl", temp.coverImageUrl);
            setValue("dateCreate", temp.dateCreate);
            setValue("songs", temp.songs);
            setValue("artists", temp.artists);
            setValue("provide", temp.provide);
            setAddArtists(temp.artists);
            setCoverImageUrl(temp.coverImageUrl);
        }
    }

    const getAllArtists = async () => {
        const temp = await artistService.getAllArtist();
        setArtists(temp);
    }

    const onSubmit = async (data) => {
        try {
            data.coverImageUrl = coverImageUrl;
            data.artists = addArtists;
            console.log(data)
            if (id !== undefined) {
                await albumService.updateAlbum(data);
            } else {
                await albumService.saveAlbum(data);
            }
            toast.success("Thêm mới album thành công!");
        } catch (error) {
            toast.error("Thêm mới thất bại!");
        }
    }

    const handleOneImageUrlChange = async (uploadedImageUrl) => {
        setCoverImageUrl(uploadedImageUrl);
    }

    const handleRemoveImg = () => {
        setCoverImageUrl(null);
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

    return (
        <Container>
            <Flex justifyContent='between'>
                <Typography tag="h1">Thêm mới album</Typography>
                <Button text='Về danh sách' icon={<IoArrowBackSharp />} gap={1} onClick={() => navigate("/dashboard/albums")} />
            </Flex>
            <Group className='overflow-hidden'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Grid md={2} gap={4}>
                        <Label>
                            <Typography>Tên album</Typography>
                            <Input size={4} placeholder="Tên album"
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
                                    <Flex key={artist.artistId}
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
                            <Flex justifyContent={'space-between'} alignItems="center" gd={{width: '100%', flexWrap: 'wrap'}}>
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
                            <Typography>Cung cấp bởi </Typography>
                            <Input size={4} placeholder="Bản quyền"
                                   {...register("provide", {
                                       required: "Không được để trống!"
                                   })}
                            />
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