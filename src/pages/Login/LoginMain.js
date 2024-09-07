// import "./login.scss"
// import {useEffect, useState} from "react";
// import {Link, Navigate} from "react-router-dom";
// import logo from "../../assets/images/logo-music.png";

// export function LoginMain({content, showRegister}) {
//     const isAuthenticated = !!localStorage.getItem('isAuthenticated');
//     const [isShowRegister, setIsShowRegister] = useState(false);

//     useEffect(() => {
//         setIsShowRegister(showRegister);
//     }, [showRegister]);

//     if (isAuthenticated) {
//         return <Navigate to="/"/>
//     }

//     return (
//         <div>
//             <div className="login-header">
//                 <div className="left">
//                     <div className="logo">

//                     </div>
//                 </div>
//                 <div className="middle">

//                 </div>
//                 <div className="right">
//                     <div className="link-back">
//                         <Link to='/'>Quay lại trang chủ</Link>
//                     </div>
//                 </div>
//             </div>
//             <div className="login-page">
//                 <div className={isShowRegister ? "form-box show-register" : "form-box"}>
//                     <div className="content">
//                         {content}
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }