import {Button, Card, Container, Flex, Form, Group, Input, Pagination, Table, Typography} from "lvq";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import Moment from "moment";
import * as albumService from "../../../core/services/AlbumService";
import {useForm} from "react-hook-form";

function AlbumsList() {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [contentSearch, setContentSearch] = useState("");
    const {register, handleSubmit, formState: {errors}, setValue, control} = useForm({

    });

    useEffect(() => {

        const fetchProducts = async () => {
            await getAlbumsList(contentSearch, currentPage);
        }
        fetchProducts().then().catch(console.error);
    }, [contentSearch, currentPage]);

    const getAlbumsList = async (contentSearch, page) => {
        const temp = await albumService.getAllAlbumsWithPage(contentSearch, page);
        setAlbums(temp.content);
        setTotalPages(temp.totalPages);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            key: 'album',
            header: 'Tên album',
            render: (row) => row.title,
        },
        {
            key: 'dateCreate',
            header: 'Ngày phát hành',
            render: (row) => Moment(row.dateCreate).format("DD/MM/yyyy"),
        },
        {
            key: 'artist',
            header: 'Nghệ sĩ thực hiện',
            render: (row) => row.artists.map(artist => (
                <Link to={"/dashboard/albums"} key={artist.artistId}
                style={{color: "#ec1ea4"}}>{artist.artistName}, </Link>
            )),
        },
        {
            key: 'action',
            header: '',
            render: (row) => (
                <Flex justifyContent='center'>
                    <Button theme='reset' text='' onClick={() => navigate(`/dashboard/album-update/${row.albumId}`)}
                            icon={<CiEdit size={22} color='#eab308' />} />
                    <Button theme='reset' text='' icon={<MdDelete size={22} color='red' />} />
                </Flex>
            ),
        },
    ];

    const onSubmit = (data) => {
        console.log(data)
        setContentSearch(data.contentSearch);
    }
    return (
        <Container>
            <Flex justifyContent='between'>
                <Typography tag="h1">Danh sách Albums</Typography>
                <Button text='Thêm mới' onClick={() => navigate("/dashboard/album-create")} />
            </Flex>
            <Group className=''>
                <Form className={'bg-transparent'} onSubmit={handleSubmit(onSubmit)} >
                    <Input type="text" gd={{ maxWidth: "400px" }} {...register("contentSearch")}
                           placeholder='Tìm kiếm bài hát ...' />
                    <Button type={"submit"} text='Tìm kiếm' gd={{display: "none"}}/>
                </Form>
                <Table border={false} columns={columns} data={albums} rowKey={"id"} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Group>
        </Container>
    );
}

export default AlbumsList;