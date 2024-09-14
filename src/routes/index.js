import Dashboard from "../pages/Dashboard/Dashboard";
import HomePage from "../pages/Home/HomePage";
import Library from "../pages/Library/Library";
import MChart from "../pages/MChart/MChart";
import LoginPage from "../pages/Login/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import AlbumsList from "../pages/Dashboard/Album/AlbumsList";
import CollaboratorList from "../pages/Dashboard/Collaborator/CollaboratorList";
import PlayList from "../pages/Dashboard/PlayList/PlayList";
import ArtistList from "../pages/Dashboard/Artist/ArtistList";
import SongList from "../pages/Dashboard/Song/SongList";
import SongCreate from "../pages/Dashboard/Song/SongCreate";
import {AlbumCreate} from "../pages/Dashboard/Album/AlbumCreate";
import {ArtistCreate} from "../pages/Dashboard/Artist/ArtistCreate";
import {Album} from "../pages/Album/Album";
import {LoginForm} from "../pages/Login/LoginForm";
import {TopWeek} from "../pages/TopWeek/TopWeek";

export const userRoutes = [
  {
    path: '/',
    component: <HomePage/>,
    exact: true,
  },
  {
    path: '/mymusic',
    component: <Library />,
  },
  {
    path: '/m-chart',
    component: <MChart />,
  },
  {
    path: '/m-chart-week/:national',
    component: <TopWeek />,
  },
  {
    path: '/albums/:id',
    component: <Album/>,
  },
  // {
  //   path: '/login',
  //   component: <LoginForm />,
  // },
  {
    path: '*',
    component: <NotFound />,
  },
];

export const adminRoutes = [
  {
    path: '/dashboard',
    component: <Dashboard/>,
    private: true,
  },
  {
    path: '/dashboard/collaborators',
    component: <CollaboratorList />,
    private: true,
  },
  {
    path: '/dashboard/songs',
    component: <SongList />,
    private: true,
  },
  {
    path: '/dashboard/song-create',
    component: <SongCreate />,
    private: true,
  },
  {
    path: '/dashboard/song-update/:id',
    component: <SongCreate />,
    private: true,
  },
  {
    path: '/dashboard/artists',
    component: <ArtistList />,
    private: true,
  },
  {
    path: '/dashboard/artist-create',
    component: <ArtistCreate />,
    private: true,
  },
  {
    path: '/dashboard/artist-update/:id',
    component: <ArtistCreate />,
    private: true,
  },
  {
    path: '/dashboard/albums',
    component: <AlbumsList />,
    private: true,
  },
  {
    path: '/dashboard/album-create',
    component: <AlbumCreate />,
    private: true,
  },
  {
    path: '/dashboard/album-update/:id',
    component: <AlbumCreate />,
    private: true,
  },
  {
    path: '/dashboard/playlists',
    component: <PlayList />,
    private: true,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];