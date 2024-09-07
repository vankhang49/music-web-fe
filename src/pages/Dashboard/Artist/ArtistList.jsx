import React, {useEffect, useState} from 'react';
import LayoutDashboard from '../../../layouts/LayoutDashboard';
import {Button, Container, Flex, Group, Input, Pagination, Table, Typography} from 'lvq';
import {useNavigate} from "react-router-dom";
import * as albumService from "../../../core/services/AlbumService";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import * as artistService from "../../../core/services/ArtistService";

function ArtistList() {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 100; // Tổng số trang

    useEffect(() => {
        const fetchData = async ()=> {
            await getAllArtists();
        }
        fetchData();
    }, []);

    const getAllArtists = async () => {
        const temp = await artistService.getAllArtist();
        setArtists(temp);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(`Đã chọn trang: ${page}`); // Xử lý số trang được chọn (ví dụ: log ra console)
    };

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
                <Flex>
                    <Input type="text" gd={{ maxWidth: "400px" }} placeholder='Tìm kiếm bài hát ...' />
                    <Button text='Tìm kiếm' />
                </Flex>
                <Table border={false} columns={columns} data={artists} rowKey={"id"} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </Group>
        </Container>
    );
}

export default ArtistList;