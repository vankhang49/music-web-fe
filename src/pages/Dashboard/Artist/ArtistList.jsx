import React, {useEffect, useState} from 'react';
import {Button, Container, Flex, Form, Group, Input, Pagination, Table, Typography} from 'lvq';
import {useNavigate} from "react-router-dom";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import * as artistService from "../../../core/services/ArtistService";
import {useForm} from "react-hook-form";

function ArtistList() {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [contentSearch, setContentSearch] = useState("");
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({

    });

    useEffect(() => {
        const fetchData = async ()=> {
            await getAllArtists(contentSearch, currentPage);
        }
        fetchData();
    }, [contentSearch, currentPage]);

    const getAllArtists = async (artistName, currentPage) => {
        const temp = await artistService.getAllArtistWithPage(artistName, currentPage);
        setArtists(temp.content);
        setTotalPages(temp.totalPages);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const onSubmit = (data) => {
        setContentSearch(data.contentSearch);
    }

    const columns = [
        {
            key: 'artist',
            header: 'Tên nghệ sĩ',
            render: (row) => row.artistName,
        },
        {
            key: 'genre',
            header: 'Thể loại',
            render: (row) => row.genres.map(genre => (
                <a href={"#"} key={genre.genreId}>{genre.genreName}, </a>
            )),
        },
        {
            key: 'album',
            header: 'Albums',
            render: (row) => row.albums.map(album => (
                <a href={"#"} key={album.albumId}>{album.title}, </a>
            )),
        },
        {
            key: 'action',
            header: '',
            render: (row) => (
                <Flex justifyContent='center'>
                    <Button theme='reset' text='' onClick={()=> navigate(`/dashboard/artist-update/${row.artistId}`)}
                            icon={<CiEdit size={22} color='#eab308' />} />
                    <Button theme='reset' text='' icon={<MdDelete size={22} color='red' />} />
                </Flex>
            ),
        },
    ];

    return (
        <Container>
            <Flex justifyContent='between'>
                <Typography tag="h1">Danh sách nghệ sĩ</Typography>
                <Button text='Thêm mới' onClick={() => navigate("/dashboard/artist-create")} />
            </Flex>
            <Group className=''>
                <Form className={'bg-transparent'} onSubmit={handleSubmit(onSubmit)} >
                    <Input type="text" gd={{ maxWidth: "400px" }} {...register("contentSearch")}
                           placeholder='Tìm kiếm nghệ sĩ ...' />
                    <Button type={"submit"} text='Tìm kiếm' gd={{display: "none"}}/>
                </Form>
                <Table border={false} columns={columns} data={artists} rowKey={"id"} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Group>
        </Container>
    );
}

export default ArtistList;