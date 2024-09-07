import mv1 from "../assets/audio/EmXinh-MONOOnionn-12581640.mp3";
import mv2 from "../assets/audio/LacTroi-SonTungMTP-4725907.mp3";
import mv3 from "../assets/audio/NoiNayCoAnh-SonTungMTP-4772041.mp3";
import mv4 from "../assets/audio/Imagine-Dragons-Thunder-(RawPraise.ng).mp3";
import mv5 from "../assets/audio/NgayDauSauChiaTay-DucPhuc-15004525.mp3";
import mv6 from "../assets/audio/NguoiTaDauThuongEmAcousticVersion-LylyAnhTuTheVoice-6953784.mp3";
import mv7 from "../assets/audio/ThiMau1-HoaMinzyMasew-8820974.mp3";
import mv8 from "../assets/audio/Người Lạ Ơi.mp3";
import mv9 from "../assets/audio/BoiViLaKhiYeu-Lyly-6728210.mp3";
import mv10 from "../assets/audio/y2meta.com - Justin Bieber - Love Yourself (PURPOSE _ The Movement) (128 kbps).mp3";
import ex from "../assets/images/ex.jpg";
import lt from "../assets/images/lt.jpg";
import nnca from "../assets/images/nnca.jpg";
import ndsct from "../assets/images/ndsct.jpg";
import lyly from "../assets/images/lyly.jpg";
import minzy from "../assets/images/hoaminzy.jpg";
import td from "../assets/images/td.jpg";
import karik from "../assets/images/karik.jpg";
import justin from "../assets/images/justinBeiber.jpg";
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
    },
    {
        "title" : "Người Ta Đâu Thương Em",
        "artists" : [
            {
                "artistId" : 5,
                "artistName": "Lyly"
            }
        ],
        "genre": "POP",
        "coverImageUrl": lyly,
        "songUrl" : mv6
    },
    {
        "title" : "Thị Mầu",
        "artists" : [
            {
                "artistId" : 6,
                "artistName": "Hoà Minzy"
            }
        ],
        "genre": "POP",
        "coverImageUrl": minzy,
        "songUrl" : mv7
    },
    {
        "title" : "Người Lạ Ơi",
        "artists" : [
            {
                "artistId" : 7,
                "artistName": "Karik"
            },
            {
                "artistId" : 8,
                "artistName": "Orange"
            }
        ],
        "genre": "POP",
        "coverImageUrl": karik,
        "songUrl" : mv8
    },
    {
        "title" : "Bởi Vì Là Khi Yêu",
        "artists" : [
            {
                "artistId" : 5,
                "artistName": "Lyly"
            },
            {
                "artistId" : 9,
                "artistName": "Anh Tú"
            }
        ],
        "genre": "POP",
        "coverImageUrl": lyly,
        "songUrl" : mv9,
        "lyrics" : "<p>Nói cho em nghe liệu yêu một người bằng hết con tim</p><p>Là đúng hay đang sai mà sao anh ơi em cứ buồn hoài như thế</p><p>Nước mắt rơi nhiều như thế và nói cho em nghe</p><p>Anh có yêu em như những lời ngọt ngào anh thường vẫn nói</p><p><br></p><p>Mà đôi khi tim em tan ra làm trăm lần</p><p>Em cô đơn dù đang gần, gần người mặc em yêu</p><p>(Trong tình yêu ai yêu nhiều hơn có phải là sai lầm</p><p>Trong tình yêu ai yêu nhiều hơn chắc chắn là sai lầm)</p><p><br></p><p>Bởi vì là khi yêu em yêu anh yêu hơn chính bản thân em</p><p>Nên đôi khi em quên mất em cũng biết buồn quên mất em cũng biết đau</p><p>Cứ thế khiến vết thương nơi con tim em càng thêm sâu</p><p>Bởi vì là khi yêu em đâu quan tâm sẽ nhận lại bao nhiêu</p><p><br></p><p>Nên đôi khi vô tâm với cảm xúc chính mình</p><p>Trao hết bao nhiêu chân tình để rồi nhận lấy những nước mắt khi yêu</p><p>Em khóc lại một lời nói dối ngập ngừng trên môi rằng sẽ qua nhanh thôi</p><p>Dẫu cho nỗi buồn hoài chồng lên nhau mặt thời gian đang trôi</p><p><br></p><p>Người cố gắng đi tìm phút giây bình yên</p><p>Người thì cứ vất bao cảm xúc ra ngoài hiên</p><p>Có phải chỉ một mình em cần tình yêu này</p><p>Khi mà anh như đã sắp đi khỏi nơi đây</p><p><br></p><p>Sao anh không nói với em một câu</p><p>Sao em vẫn cứ yêu anh đậm sâu</p><p>Bởi vì là khi yêu em yêu anh yêu hơn chính bản thân em</p><p>Nên đôi khi em quên mất em cũng biết buồn quên mất em cũng biết đau</p><p><br></p><p>Cứ thế khiến vết thương nơi con tim em càng thêm sâu</p><p>Bởi vì là khi yêu em đâu quan tâm sẽ nhận lại bao nhiêu</p><p>Nên đôi khi vô tâm với cảm xúc chính mình</p><p>Trao hết bao nhiêu chân tình để rồi nhận lấy những nước mắt khi yêu em khóc</p>"
    },
    {
        "title" : "Love YourSelf",
        "artists" : [
            {
                "artistId" : 10,
                "artistName": "Justin Beiber"
            }
        ],
        "genre": "POP",
        "coverImageUrl": justin,
        "songUrl" : mv10,
        "lyrics" : "<p>[Verse 1]</p><p>For all the times that you rained on my parade</p><p>And all the clubs you get in using my name</p><p>You think you broke my heart, oh girl for goodness sake</p><p>You think I'm cryin' on my own, well I ain't</p><p><br></p><p>[Refrain]</p><p>And I didn't wanna write a song</p><p>'Cause I didn't want anyone thinking I still care</p><p>I don't but, you still hit my phone up</p><p>And baby I'll be movin' on</p><p>And I think you should be somethin'</p><p>I don't wanna hold back</p><p>Maybe you should know that</p><p><br></p><p>[Pre-Chorus]</p><p>My mama don't like you and she likes everyone</p><p>And I never like to admit that I was wrong</p><p>And I've been so caught up in my job, didn't see what's going on</p><p>But now I know, I'm better sleeping on my own</p><p><br></p><p>[Chorus]</p><p>'Cause if you like the way you look that much</p><p>Oh baby you should go and love yourself</p><p>And if you think that I'm still holdin' on to somethin'</p><p>You should go and love yourself</p><p><br></p><p>[Verse 2]</p><p>But when you told me that you hated my friends</p><p>The only problem was with you and not them</p><p>And every time you told me my opinion was wrong</p><p>And tried to make me forget where I came from</p><p><br></p><p>[Refrain]</p><p>And I didn't wanna write a song</p><p>'Cause I didn't want anyone thinking I still care</p><p>I don't but, you still hit my phone up</p><p>And baby I'll be movin' on</p><p>And I think you should be somethin'</p><p>I don't wanna hold back</p><p>Maybe you should know that</p><p><br></p><p>[Pre-Chorus]</p><p>My mama don't like you and she likes everyone</p><p>And I never like to admit that I was wrong</p><p>And I've been so caught up in my job, didn't see what's going on</p><p>But now I know, I'm better sleeping on my own</p><p><br></p><p>[Chorus]</p><p>'Cause if you like the way you look that much</p><p>Oh baby you should go and love yourself</p><p>And if you think that I'm still holdin' on to somethin'</p><p>You should go and love yourself</p><p><br></p><p>[Bridge]</p><p>For all the times that you made me feel small</p><p>I fell in love, now I feel nothin' at all</p><p>I never felt so low and I was vulnerable</p><p>Was I a fool to let you break down my walls?</p><p><br></p><p>[Chorus]</p><p>'Cause if you like the way you look that much</p><p>Oh baby you should go and love yourself</p><p>And if you think that I'm still holdin' on to somethin'</p><p>You should go and love yourself</p><p>'Cause if you like the way you look that much</p><p>Oh baby you should go and love yourself</p><p>And if you think that I'm still holdin' on to somethin'</p><p>You should go and love yourself</p>"
    },
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