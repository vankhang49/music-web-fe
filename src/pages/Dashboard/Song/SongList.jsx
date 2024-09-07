import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Flex, Group, Input, Pagination, Table, Typography } from 'lvq';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import * as songService from "../../../core/services/SongService";

function SongList() {

    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 100; // Tổng số trang

    useEffect(() => {

        const fetchProducts = async () => {
            await getSongsList();
        }
        fetchProducts().then().catch(console.error);
    }, []);

    const getSongsList = async () => {
        const temp = await songService.getAllSongs();
        setSongs(temp);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(`Đã chọn trang: ${page}`); // Xử lý số trang được chọn (ví dụ: log ra console)
    };

    const columns = [
        {
            key: 'name',
            header: 'Tên bài hát',
            render: (row) => row.title,
        },
        {
            key: 'genre',
            header: 'Thể loại',
            render: (row) => row.genres.map(genre => (
                <a href={"/"}>{genre.genreName}, </a>
            )),
        },
        {
            key: 'artist',
            header: 'Nghệ sĩ thực hiện',
            render: (row) => row.artists.map(artist => (
                <a href="/" key={artist.artistId}>{artist.artistName}, </a>
            )),
        },
        {
            key: 'audio',
            header: 'Audio',
            render: (row) => <audio src={row.songUrl} autoPlay={false} controls={true} />,
        },
        {
            key: 'action',
            header: '',
            render: (row) => (
                <Flex justifyContent='center'>
                    <Button theme='reset' text='' onClick={()=> navigate(`/dashboard/song-update/${row.songId}`)}
                            icon={<CiEdit size={22} color='#eab308' />} />
                    <Button theme='reset' text='' icon={<MdDelete size={22} color='red' />} />
                </Flex>
            ),
        },
    ];

    return (
        <Container>
            <Flex justifyContent='between'>
                <Typography tag="h1">Danh sách bài hát</Typography>
                <Button text='Thêm mới' onClick={() => navigate("/dashboard/song-create")} />
            </Flex>
            <Group className=''>
                <Flex>
                    <Input type="text" gd={{ maxWidth: "400px" }} placeholder='Tìm kiếm bài hát ...' />
                    <Button text='Tìm kiếm' />
                </Flex>
                <Table border={false} columns={columns} data={songs} rowKey={"id"} gd={{ borderRadius: '10px' }} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Group>
        </Container>
    );
}

export default SongList;