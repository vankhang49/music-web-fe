import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import routes, {adminRoutes, userRoutes} from './routes';
import PrivateRoute from './utils/PrivateRoute';
import './assets/styles/global.scss';
//Thư viện tạo hiệu ứng 
import AOS from 'aos';
import 'aos/dist/aos.css';
import {PlayMusicProvider} from "./core/contexts/PlayMusicContext";
import LayoutHome from "./layouts/LayoutHome";
import LayoutDashboard from "./layouts/LayoutDashboard";
import LoginPage from "./pages/Login/LoginPage";
import {LoginForm} from "./pages/Login/LoginForm";
import {RegisterForm} from "./pages/Login/RegisterForm";
import {AuthProvider} from "./firebase";
AOS.init();

function App() {
    return (

            <PlayMusicProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<LayoutHome/>}>
                            {userRoutes.map((route, index) => {
                                if (route.private) {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={<PrivateRoute element={route.component}/>}
                                        />
                                    );
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={route.component}
                                    />
                                );
                            })}
                        </Route>
                        <Route path="/dashboard" element={<LayoutDashboard/>}>
                            {adminRoutes.map((route, index) => {
                                if (route.private) {
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={<PrivateRoute element={route.component}/>}
                                        />
                                    );
                                }

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={route.component}
                                    />
                                );
                            })}
                        </Route>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/register"} element={<RegisterForm/>}/>
                    </Routes>
                </Router>
            </PlayMusicProvider>

    );
}

export default App;
