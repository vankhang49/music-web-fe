import {Avatar, Button, Card, Container, Flex, Group, Input, Pagination, Table, Typography} from "lvq";
import React, {useEffect, useState} from "react";
import * as favoriteService from "../../../core/services/FavoriteService";
import {CiEdit} from "react-icons/ci";
import {MdDelete} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import {AiFillHeart, AiFillPlayCircle, AiFillPlusCircle, AiOutlineArrowRight, AiOutlineRight} from "react-icons/ai";
import {TimeExtractor} from "./TimeExtractor";
import {RiMusic2Line} from "react-icons/ri";

export function FavoriteList() {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {

        const fetchProducts = async () => {
            await getFavoritesList('');
        }
        fetchProducts().then().catch(console.error);
    }, []);

    const getFavoritesList = async () => {
        const temp = await favoriteService.getAllFavorite('');
        setFavorites(temp);
    }
    console.log(favorites)


    const columns = [
        {
            key: 'title',
            header: 'BÀI HÁT',
            render: (row) => <Flex>
                <Typography gd={{fontSize:"15px", padding:"20px 5px"}}>
                    <RiMusic2Line />
                </Typography>
                <Card srcImg={row?.songDTO.coverImageUrl} shape={"square"} sizeImg={50}
                      title={<Flex>
                          <Typography>
                              {row.songDTO.title}
                          </Typography>
                          <Typography>
                              Premium
                          </Typography>
                      </Flex>}
                      long={true}
                      description={row?.songDTO.artists.map(artist => (
                          <a href="/" key={artist.artistId}>{artist.artistName}, </a>
                      ))}/>
            </Flex>,
        },
        {
            key: 'album',
            header: 'ALBUM',
            render: (row) => row.songDTO.album.title
        },
        {
            key: 'thời gian',
            header: <Flex right={true}>THỜI GIAN</Flex>,
            render: (row) => <Flex right={true}><AiFillHeart style={{color:"#ec4899"}}/><TimeExtractor dateTime={row.addedAt}/></Flex>
        }
    ];

    return (
        <Container>
            <Group>
                <Typography tag="h1" gd={{fontSize: "40px", marginBottom:"16px"}}>THƯ VIỆN <AiFillPlayCircle style={{paddingTop:"10px"}}/></Typography>
                <Flex gap={"7"} gd={{ marginBottom:"16px"}}>
                    <Card title={"Alan Walker"}
                          srcImg={"https://th.bing.com/th/id/OIP.3D4rrmCdhZliQyfECCthAAHaHa?rs=1&pid=ImgDetMain"}
                          shape={"circle"} sizeImg={130} gd={{ width: "16,666%"}}/>
                    <Card title={"Alan Walker"}
                          srcImg={"https://th.bing.com/th/id/OIP.3D4rrmCdhZliQyfECCthAAHaHa?rs=1&pid=ImgDetMain"}
                          shape={"circle"} sizeImg={130} gd={{width: "16,666%"}}/>
                    <Card title={"Alan Walker"}
                          srcImg={"https://th.bing.com/th/id/OIP.3D4rrmCdhZliQyfECCthAAHaHa?rs=1&pid=ImgDetMain"}
                          shape={"circle"} sizeImg={130} gd={{ width: "16,666%"}}/>
                    <Card title={"Alan Walker"}
                          srcImg={"https://th.bing.com/th/id/OIP.3D4rrmCdhZliQyfECCthAAHaHa?rs=1&pid=ImgDetMain"}
                          shape={"circle"} sizeImg={130} gd={{ width: "16,666%"}}/>
                    <Card title={"Alan Walker"}
                          srcImg={"https://th.bing.com/th/id/OIP.3D4rrmCdhZliQyfECCthAAHaHa?rs=1&pid=ImgDetMain"}
                          shape={"circle"} sizeImg={130} gd={{ width: "16,666%"}}/>
                    <Group gd={{textAlign: "center", width: "16,666%"}}>
                           <Typography gd={{
                               borderRadius: "50%",
                               border: "1px solid",
                               width: "130px",
                               height: "130px",
                               fontSize: "30px",
                               paddingTop: "50px"
                           }}>
                               <AiOutlineArrowRight/>
                           </Typography>
                           <Typography gd={{paddingRight :'36px'}}>Xem tất cả</Typography>
                    </Group>
                </Flex>
            </Group>
            <Group gd={{marginBottom:"30px"}}>
                <Flex between={true} gd={{marginBottom:"20px"}}>
                    <Typography tag={"h1"} gd={{fontSize:"25px"}}>PLAYLIST <AiFillPlusCircle style={{paddingTop:"10px",fontSize:"30px"}}/></Typography>
                    <Typography tag={"p"} gd={{fontSize:"15px",color:"#333"}}>Tất cả <AiOutlineRight style={{marginTop:"5px"}}/></Typography>
                </Flex>
                <Flex gap={7} >
                    <Card srcImg={"https://e1.pxfuel.com/desktop-wallpaper/424/1010/desktop-wallpaper-all-things-spotify-playlist-covers-aesthetic-playlist-covers.jpg"} sizeImg={200} title={"4U - On Repeat"} description={<Typography tag={"p"} gd={{color:"#ccc"}}>Zing MP3</Typography>}/>
                    <Card srcImg={"https://e1.pxfuel.com/desktop-wallpaper/424/1010/desktop-wallpaper-all-things-spotify-playlist-covers-aesthetic-playlist-covers.jpg"} sizeImg={200} title={"4U - On Repeat"} description={<Typography tag={"p"} gd={{color:"#ccc"}}>Zing MP3</Typography>}/>
                </Flex>
            </Group>
            <Flex gap={8} gd={{borderBottom:"1px solid white",marginBottom:"30px"}}>
                <Typography gd={{color:"#fff"}}>BÀI HÁT</Typography>
                <Typography gd={{color:"#fff"}}>ALBUM</Typography>
                <Typography gd={{color:"#fff"}}>MV</Typography>
            </Flex>
            <Flex gd={{marginBottom:"30px"}}>
                <Typography tag="p" gd={{color:"#fff", textAlign:"center", width:'100px', height:'25px',borderRadius:'30px', border:'1px solid black', background:"#ec4899",fontSize:"13px", paddingTop:'3px'}}>BÀI HÁT</Typography>
                <Typography tag="p" gd={{color:"#fff", textAlign:"center", width:'100px', height:'25px',borderRadius:'30px', border:'1px solid black',fontSize:"13px", paddingTop:'3px'}}>ĐÃ TẢI LÊN</Typography>
            </Flex>
            <Group className=''>
                {
                    favorites ?                 <Table border={false} columns={columns} data={favorites} rowKey={"id"} gd={{borderRadius: '10px'}}/>
: "không có bài hát, album yêu thích"
                }
            </Group>
        </Container>
    );
}