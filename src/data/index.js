import mv1 from "../assets/audio/EmXinh-MONOOnionn-12581640.mp3";
import mv2 from "../assets/audio/LacTroi-SonTungMTP-4725907.mp3";
import mv3 from "../assets/audio/NoiNayCoAnh-SonTungMTP-4772041.mp3";
import mv4 from "../assets/audio/Imagine-Dragons-Thunder-(RawPraise.ng).mp3";
import mv5 from "../assets/audio/NgayDauSauChiaTay-DucPhuc-15004525.mp3";
import ex from "../assets/images/ex.jpg";
import lt from "../assets/images/lt.jpg";
import nnca from "../assets/images/nnca.jpg";
import ndsct from "../assets/images/ndsct.jpg";
import td from "../assets/images/td.jpg";
import { IoIosAdd } from "react-icons/io";
import { ReactComponent as Library } from '../assets/icons/library.svg'
import { ReactComponent as Discover } from '../assets/icons/discover.svg'
import { ReactComponent as MChart } from '../assets/icons/zing-chart.svg'
import { ReactComponent as Rank } from '../assets/icons/rank.svg'
import { ReactComponent as TopicType } from '../assets/icons/topic-type.svg'
import { ReactComponent as Top100 } from '../assets/icons/top100.svg'
import { ReactComponent as History } from '../assets/icons/history-listen.svg'
import { ReactComponent as LoveSong } from '../assets/icons/love.svg'
import { ReactComponent as Playlist } from '../assets/icons/playlist.svg'
import { ReactComponent as Album } from '../assets/icons/album.svg'
import { FaPeopleGroup } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
import { IoMusicalNotes } from "react-icons/io5";
import { GiMicrophone } from "react-icons/gi";
import { BiSolidAlbum } from "react-icons/bi";
import { RiPlayList2Line } from "react-icons/ri";

export const songsData = [
    {
        "title" : "Em Xinh",
        "artists" : [
            {
            "artistId" : 1,
            "artistName": "MONO"
            }
        ],
        "genre": "POP",
        "coverImageUrl": ex,
        "songUrl" : mv1
    },
    {
        "title" : "Lạc Trôi",
        "artists" : [
            {
                "artistId" : 2,
                "artistName": "Sơn Tùng M-TP"
            }
        ],
        "genre": "POP",
        "coverImageUrl": lt,
        "songUrl" : mv2
    },
    {
        "title" : "Nơi này có anh",
        "artists" : [
            {
                "artistId" : 2,
                "artistName": "Sơn Tùng M-TP"
            }
        ],
        "genre": "POP",
        "coverImageUrl": nnca,
        "songUrl" : mv3
    },
    {
        "title" : "Ngày Đầu Sau Chia Tay",
        "artists" : [
            {
                "artistId" : 3,
                "artistName": "Đức Phúc"
            }
        ],
        "genre": "ballad",
        "coverImageUrl": ndsct,
        "songUrl" : mv5
    },
    {
        "title" : "Thunder",
        "artists" : [
            {
                "artistId" : 4,
                "artistName": "Imagine Dragons"
            }
        ],
        "genre": "EDM",
        "coverImageUrl": td,
        "songUrl" : mv4
    }
]
export const navigationHomeItems1 = [
    { id: 'library', label: 'Thư viện', link: '/mymusic', icon: <Library />, iconPosition: 'left' },
    { id: 'home', label: 'Khám phá', link: '/', icon: <Discover />, iconPosition: 'left' },
    { id: 'zing-chart', label: '#M-Chart', link: '/m-chart', icon: <MChart />, iconPosition: 'left' },
];

export const navigationHomeItems2 = [
    { id: 'rank', label: 'BXH Nhạc mới', link: '/moi-phat-hanh', icon: <Rank />, iconPosition: 'left' },
    { id: 'topic-type', label: 'Chủ đề & Thể loại', link: '/hub', icon: <TopicType />, iconPosition: 'left' },
    { id: 'top100', label: 'Top 100', link: '/top100', icon: <Top100 />, iconPosition: 'left' },
    { id: 'history', label: 'Nghe gần đây', link: '/history', icon: <History />, iconPosition: 'left' },
    { id: 'love-song', label: 'Bài hát yêu thích', link: '/love-song', icon: <LoveSong />, iconPosition: 'left' },
    { id: 'playlist', label: 'Playlist', link: '/playlist', icon: <Playlist />, iconPosition: 'left' },
    { id: 'album', label: 'Album', link: '/album', icon: <Album />, iconPosition: 'left' },
];

export const navigationHomeItems3 = [
    { id: 'create-playlist', label: 'Tạo Playlist mới', link: '/tao-playlist', icon: <IoIosAdd size={24} />, iconPosition: 'left' },
];

export const navigationDashboardItems1 = [
    { id: 'dashboard', label: 'Dashboard', link: '/dashboard', icon: <MdOutlineDashboard size={22} />, iconPosition: 'left' },
    { id: 'collaborators', label: 'Cộng tác viên', link: '/dashboard/collaborators', icon: <FaPeopleGroup size={22} />, iconPosition: 'left' },
    { id: 'songs', label: 'Bài hát', link: '/dashboard/songs', icon: <IoMusicalNotes size={22} />, iconPosition: 'left' },
    { id: 'artists', label: 'Nghệ sĩ', link: '/dashboard/artists', icon: <GiMicrophone size={22} />, iconPosition: 'left' },
    { id: 'albums', label: 'Albums', link: '/dashboard/albums', icon: <BiSolidAlbum size={22} />, iconPosition: 'left' },
    { id: 'playlists', label: 'Danh sách phát', link: '/dashboard/playlists', icon: <RiPlayList2Line size={22} />, iconPosition: 'left' },
];

export const navigationDashboardItems2 = [

];

export const navigationDashboardItems3 = [
    { id: 'logout', label: 'Đăng xuất', link: '', icon: <CiLogout size={22} />, iconPosition: 'left' },
];