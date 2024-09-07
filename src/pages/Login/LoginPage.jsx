import ModalMenuSignUp from "../../components/Modal/ModalMenuSign";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authenticationService from "../../core/services/AuthenticationService"
import { Container } from "lvq";
import './LoginPage.scss';

function LoginPage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = authenticationService.isAuthenticated();
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <Container className="bg-login">
      <ModalMenuSignUp isOpen={true} ></ModalMenuSignUp>
    </Container>
  );
}

export default LoginPage;