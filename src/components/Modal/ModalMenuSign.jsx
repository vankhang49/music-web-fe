import {useState} from "react";
import {Button, Grid, Modal, Typography, Input, Label, Flex, Form, ErrorMessage, RenderIf} from "lvq";
import {CiUser} from "react-icons/ci";
import {ReactComponent as Google} from "../../assets/icons/icons8-google.svg";
import {ReactComponent as Facebook} from "../../assets/icons/icons8-facebook.svg";
import {MdCancel} from "react-icons/md";
import {useForm} from "react-hook-form";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";
import * as authenticationService from "../../core/services/AuthenticationService";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {FaArrowLeftLong} from "react-icons/fa6";
import {IoMdClose} from "react-icons/io";


const ModalMenuSignUp = ({isOpen, onClose}) => {
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const isAuthenticated = authenticationService.isAuthenticated();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({criteriaMode: "all"});
    const navigate = useNavigate();

    const [validateError, setValidateError] = useState([]);

    const showSignIn = () => {
        setIsSignIn(true);
        setIsSignUp(false);
        reset();
    };

    const showSignUp = () => {
        setIsSignUp(true);
        setIsSignIn(false);
        reset();
    };
    const handleBackClick = () => {
        setIsSignIn(false);
        setIsSignUp(false);
        reset();
        setValidateError([]);
    };
    const handleSignInSubmit = async (data) => {
        try {
            const userData = await authenticationService.login(data);
            const user = {
                token: userData.token,
                fullName: userData.fullName,
                avatar: userData.avatar,
                userId: userData.userId,
            };
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                const decodedToken = jwtDecode(userData.token);
                if (decodedToken && window.location.pathname !== "/login") {
                    onClose()
                    toast.success("Đăng nhập thành công!");
                }
                if (window.location.pathname == "/login") {
                    toast.success("Đăng nhập thành công!");
                    navigate("/dashboard");
                }
            }
            reset();
        } catch (error) {
            console.log(error);

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
    };
    const onGoogleSignIn = (e) => {
        // e.preventDefault()
        // if (!isSigningIn) {
        //     setIsSigningIn(true)
        //     doSignInWithGoogle().catch(err => {
        //         setIsSigningIn(false)
        //     })
        // }
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose} gd={{padding: "0.5rem"}} className="shadow shadow-slate-400">
            <>
                {!isSignIn && !isSignUp && (
                    <>
                        <Typography tag="h2" center className="text-[1.75rem]">Đăng nhập vào Music
                            Streaming</Typography>
                        <Grid gap={4} gd={{marginTop: "2rem"}} center>
                            <Button
                                theme="sign_up"
                                size={4}
                                text="Sử dụng email / số điện thoại"
                                icon={<CiUser size={21}/>}
                                gap={8}
                                rounded="rounded-full"
                                onClick={showSignIn}
                                className="w-3/4"
                            />
                            <Button
                                disabled={isSignIn}
                                theme="sign_up"
                                size={4}
                                text= {isSignIn ? 'Đang đăng nhập ...' : 'Đăng nhập với Google'}
                                icon={<Google/>}
                                gap={8}
                                rounded="rounded-full"
                                className="w-3/4"
                                onClick={(e) => {
                                    onGoogleSignIn(e)
                                }}

                            />
                            <Button
                                disabled={isSignIn}
                                theme="sign_up"
                                size={4}
                                text= {isSignIn ? 'Đang đăng nhập ...' : 'Đăng nhập với Google'}
                                icon={<Facebook/>}
                                gap={8}
                                rounded="rounded-full"
                                className="w-3/4"
                            />
                            <Flex>
                                <Typography>Bạn chưa có tài khoản ?</Typography>
                                <Button theme="reset" text="Đăng ký" gd={{textDecoration: "underline"}}
                                        onClick={showSignUp}/>
                            </Flex>
                            <Typography>Việc bạn tiếp tục sử dụng trang web này đồng nghĩa bạn đồng ý
                                với điều khoản sử dụng của chúng tôi</Typography>
                        </Grid>
                    </>
                )}
                {/* Phần Đăng nhập tài khoản */}
                {isSignIn && (
                    <>
                        <Flex between>
                            <Button onClick={handleBackClick} theme="reset"
                                    icon={<FaArrowLeftLong size={22}/>}></Button>
                            <RenderIf isTrue={window.location.pathname !== "/login"}>
                                <Button onClick={onClose} theme="reset" icon={<IoMdClose size={22}/>}></Button>
                            </RenderIf>
                        </Flex>
                        <Typography tag="h2" center>Đăng nhập</Typography>
                        <Form onSubmit={handleSubmit(handleSignInSubmit)} className="md:min-w-[448px] mt-6">
                            <Grid gap={4}>
                                <Label>
                                    <Input
                                        size={5}
                                        {...register("email", {
                                            required: "* Bắt buộc nhập trường này",
                                        })}
                                        type="email"
                                        placeholder="Nhập email"
                                    />
                                    <ErrorMessage condition={errors?.email || validateError?.email}
                                                  message={errors?.email?.message}/>
                                </Label>
                                <Label>
                                    <Input
                                        size={5}
                                        {...register("password", {
                                            required: "* Bắt buộc nhập trường này",
                                        })}
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <ErrorMessage condition={errors?.password || validateError?.password}
                                                  message={errors?.password?.message}/>
                                </Label>
                                <Button type="submit" size={4} text="Đăng nhập"></Button>
                            </Grid>
                        </Form>
                        <Flex>
                            <Typography>Bạn chưa có tài khoản ?</Typography>
                            <Button theme="reset" text="Đăng ký" gd={{textDecoration: "underline"}}
                                    onClick={showSignUp}/>
                        </Flex>
                    </>
                )}

                {/* Phần Đăng ký tài khoản */}
                {isSignUp && (
                    <>
                        <Flex between>
                            <Button onClick={handleBackClick} theme="reset"
                                    icon={<FaArrowLeftLong size={22}/>}></Button>
                            <RenderIf isTrue={window.location.pathname !== "/login"}>
                                <Button onClick={onClose} theme="reset" icon={<IoMdClose size={22}/>}></Button>
                            </RenderIf>
                        </Flex>
                        <Typography tag="h2" center>Đăng ký</Typography>
                        <Form onSubmit={handleSubmit(handleSignUpSubmit)} className="md:min-w-[448px] mt-6">
                            <Grid gap={4}>
                                <Label>
                                    <Input
                                        size={5}
                                        {...register("newEmail", {
                                            required: "* Bắt buộc nhập trường này",
                                        })}
                                        type="email"
                                        placeholder="Nhập email "
                                    />
                                    <ErrorMessage condition={errors?.newEmail || validateError?.newEmail}
                                                  message={errors?.newEmail?.message}/>
                                </Label>
                                <Label>
                                    <Input
                                        size={5}
                                        {...register("newPassword", {
                                            required: "* Bắt buộc nhập trường này",
                                        })}
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <ErrorMessage condition={errors?.newPassword || validateError?.newPassword}
                                                  message={errors?.newPassword?.message}/>
                                </Label>
                                <Label>
                                    <Input
                                        size={5}
                                        {...register("confirmPassword", {
                                            required: "* Bắt buộc nhập trường này",
                                        })}
                                        type="password"
                                        placeholder="Xác nhận mật khẩu"
                                    />
                                    <ErrorMessage condition={errors?.confirmPassword || validateError?.confirmPassword}
                                                  message={errors?.confirmPassword?.message}/>
                                </Label>
                                <Button type="submit" size={4} text="Đăng ký"></Button>
                            </Grid>
                        </Form>
                        <Flex>
                            <Typography>Bạn đã có tài khoản ?</Typography>
                            <Button theme="reset" text="Đăng nhập" gd={{textDecoration: "underline"}}
                                    onClick={showSignIn}/>
                        </Flex>
                    </>
                )}
            </>
        </Modal>
    );
};

export default ModalMenuSignUp;
