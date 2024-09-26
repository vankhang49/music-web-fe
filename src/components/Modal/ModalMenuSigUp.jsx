import { useState } from "react";
import { Button, Grid, Modal, Typography, Input, Label } from "lvq";
import { CiUser } from "react-icons/ci";
import { ReactComponent as Google } from "../../assets/icons/icons8-google.svg";
import { ReactComponent as Facebook } from "../../assets/icons/icons8-facebook.svg";
import { MdCancel } from "react-icons/md";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import * as authenticationService from "../../core/services/AuthenticationService";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ModalMenuSignUp = ({ isOpen, onClose }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const isAuthenticated = authenticationService.isAuthenticated();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ criteriaMode: "all" });
  const navigate = useNavigate();

  const [validateError, setValidateError] = useState([]);

  const showSignIn = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };

  const showSignUp = () => {
    setIsSignUp(true);
    setIsSignIn(false);
  };
  const handleBackClick = () => {
    setIsSignIn(false);
    setIsSignUp(false);
    handleResetSignIn();
    handleResetSignUp();
    setValidateError([]);
  };
  const handleResetSignIn = () => {
    reset({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  const handleResetSignUp = () => {
    reset({
      newEmail: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  const handleSignInSubmit = async (data) => {
    try {
      const userData = await authenticationService.login(data);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("fullName", userData.fullName);
        localStorage.setItem("avatar", userData.avatar);
        const decodedToken = jwtDecode(userData.token);
        if (decodedToken) {
          navigate("/dashboard");
          toast.success("Đăng nhập thành công!");
        }
      }
      handleResetSignIn();
    } catch (error) {
      handleResetSignIn();
      setValidateError(error);
      toast.error("Đăng nhập thất bại");
    }
  };
  const handleSignUpSubmit = async (data) => {
    try {
      const userData = await authenticationService.register(data);
      if (userData.statusCode === 200) {
        toast.success(userData.message);
      }
      // handleResetSignUp();
      setValidateError([]);
    } catch (error) {
      setValidateError(error);
      // handleResetSignUp();
    }
    handleResetSignUp();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={{ width: "500px", height: "500px", marginTop: "100px" }}>
        {!isSignIn && !isSignUp && (
          <>
            <MdCancel
              size={30}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={onClose}
              gd={{ cursor: "pointer" }}
            />
            <Typography tag="h2">Đăng nhập vào Music Streaming</Typography>
            <Grid gap={4}>
              <Button
                theme="sign_up"
                size={4}
                text="Sử dụng email / số điện thoại"
                icon={<CiUser size={21} />}
                gap={8}
                rounded="rounded-full"
                onClick={showSignIn}
              />
              <Button
                theme="sign_up"
                size={4}
                text="Đăng nhập với Google"
                icon={<Google />}
                gap={8}
                rounded="rounded-full"
              />
              <Button
                theme="sign_up"
                size={4}
                text="Đăng nhập với Facebook"
                icon={<Facebook />}
                gap={8}
                rounded="rounded-full"
              />
              <Label>
                Bạn chưa có tài khoản ?{" "}
                <b style={{ textDecoration: "underline" }} onClick={showSignUp}>
                  Đăng ký
                </b>
              </Label>
              <Label>
                <b style={{ textDecoration: "underline" }}>Quên mật khẩu ?</b>
              </Label>
              <Label >
                Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                với <a href="">điều khoản sử dụng</a> của chúng tôi
              </Label>
            </Grid>
          </>
        )}

        {isSignIn && (
          <div>
            <Button onClick={handleBackClick} size={4} text="Quay lại"></Button>
            <Typography tag="h2">Đăng nhập</Typography>
            <form onSubmit={handleSubmit(handleSignInSubmit)}>
              <Label htmlFor="email">Email:</Label>
              <Input
                {...register("email", {
                  required: "* Bắt buộc nhập trường này",
                })}
                type="email"
                placeholder="Nhập email"
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "16px" }}>
                  {errors.email.message}
                </p>
              )}
              <span className="error-create-notification">
                {validateError?.email}
              </span>
              <Label htmlFor="password">Mật khẩu:</Label>
              <Input
                {...register("password", {
                  required: "* Bắt buộc nhập trường này",
                })}
                type="password"
                placeholder="Nhập mật khẩu"
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "16px" }}>
                  {errors.password.message}
                </p>
              )}
              <span className="error-create-notification">
                {validateError?.password}
              </span>
              <Button type="submit" size={4} text="Đăng nhập"></Button>
            </form>
          </div>
        )}
        {isSignUp && (
          <div>
            <Button onClick={handleBackClick} size={4} text="Quay lại"></Button>
            <Typography tag="h2">Đăng ký</Typography>
            <form onSubmit={handleSubmit(handleSignUpSubmit)}>
              <Label htmlFor="email">Email:</Label>
              <Input
                {...register("newEmail", {
                  required: "* Bắt buộc nhập trường này",
                })}
                name="newEmail"
                type="email"
                placeholder="Nhập email"
              />
              {errors.newEmail && (
                <p style={{ color: "red", fontSize: "16px" }}>
                  {errors.newEmail.message}
                </p>
              )}
              <span className="error-create-notification">
                {validateError?.newEmail}
              </span>
              <Label htmlFor="password">Mật khẩu:</Label>
              <Input
                {...register("newPassword", {
                  required: "* Bắt buộc nhập trường này",
                })}
                type="password"
                placeholder="Nhập mật khẩu"
                name="newPassword"
              />
              {errors.newPassword && (
                <p style={{ color: "red", fontSize: "16px" }}>
                  {errors.newPassword.message}
                </p>
              )}
              <span className="error-create-notification">
                {validateError?.newPassword}
              </span>
              <Label htmlFor="password">Xác nhận mật khẩu</Label>
              <Input
                {...register("confirmPassword", {
                  required: "* Bắt buộc nhập trường này",
                })}
                type="password"
                placeholder="Nhập lại mật khẩu"
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <p style={{ color: "red", fontSize: "16px" }}>
                  {errors.confirmPassword.message}
                </p>
              )}
              <span className="error-create-notification">
                {validateError?.confirmPassword}
              </span>
              <Button size={4} text="Đăng ký" type="submit" />
            </form>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalMenuSignUp;
