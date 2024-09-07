import { Button, Modal, Nav, Sidebar, Typography } from 'lvq';
import Logo from '../../assets/images/logo-music.png';
import { navigationHomeItems1, navigationHomeItems2, navigationHomeItems3 } from '../../data';
import { Link, useNavigate } from 'react-router-dom';

export const SidebarHomeMobile = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const home = () => {
        navigate('/');
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} position='left' className='p-0'>
            <Sidebar gd={{height: "100vh"}}>
                <Button text="" className="logo-app" theme="logo" size={1} icon={<img src={Logo} height="60px" onClick={() => home()} />} />
                <Nav listNav={navigationHomeItems1} LinkComponent={Link} className="" activeClass="active-class" overflow={false} />
                <Typography className="hr-top"></Typography>
                <Nav listNav={navigationHomeItems2} LinkComponent={Link} className="" activeClass="active-class" />
                <Nav listNav={navigationHomeItems3} LinkComponent={Link} className="" activeClass="active-class" gd={{ marginTop: "auto" }} overflow={false} />
            </Sidebar>
        </Modal>
    );
};
