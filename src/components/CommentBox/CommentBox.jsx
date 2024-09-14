import {Avatar, Button, Container, Flex, Form, Group, Input, Label, Typography} from "lvq";
import {IoIosArrowUp} from "react-icons/io";
import {useEffect, useRef, useState} from "react";
import "./commentBox.css";
import * as commentService from "../../core/services/CommentService";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {ReplyComponent} from "./ReplyComponent";
import {over} from 'stompjs';
import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import { BiSolidDislike } from "react-icons/bi";
import haha from "../../assets/gif/haha.gif";
import love from "../../assets/gif/love.gif";
import wow from "../../assets/gif/wow.gif";
import dislike from "../../assets/gif/dislike.gif";
import like from "../../assets/gif/like.gif";

const BASE_URL = process.env.REACT_APP_API_URL;

const user = JSON.parse(localStorage.getItem("user"));

export function CommentBox({openComment, callOpenComment}) {
    const {
        playSongList,
        songIndexList,
    } = usePlayMusic();
    const userId = user?.userId || 0;
    console.log(userId)
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [numberElement, setNumberElement] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [size, setSize] = useState(10);
    const [comments, setComments] = useState([]);
    const {register: registerComment, handleSubmit: handleSubmitComment, reset: resetComment} = useForm();
    const {register: registerReply, handleSubmit: handleSubmitReply, reset: resetReply} = useForm();
    const [isReply, setIsReply] = useState(false);
    const [commentId, setCommentId] = useState(null);
    const songId = playSongList[songIndexList].songId;
    const urlSocketRef = useRef('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        if (songId !== undefined) {
            const fetchData = async () => {
                await getAllCommentBySong(songId, size)
            }
            fetchData();
        }
    }, [size, songId])

    useEffect(() => {
        setIsOpenComment(openComment);
    }, [openComment]);

    useEffect(() => {
        const socket = new SockJS(`${BASE_URL}/ws`);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/comment", async (message) => {
                    console.log("useEffect ở load comment đang hoaạt động")
                    if (songId !== undefined) {
                        const fetchData = async () => {
                            await getAllCommentBySong(songId, size)
                        }
                        fetchData();
                    }
                }
            )
        });
        setStompClient(stompClient);
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [size, songId]);

    useEffect(() => {
        const socket = new SockJS(`${BASE_URL}/ws`);
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe("/topic/createComment", async (message) => {
                    toast.dark("Vừa có bình luận mới!", {autoClose: 500})
                console.log(message)
                    if (songId !== undefined) {
                        const fetchData = async () => {
                            await getAllCommentBySong(songId, size)
                        }
                        fetchData();
                    }
                }
            )
        });
        setStompClient(stompClient);
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [size, songId]);

    const getAllCommentBySong = async (songId, size) => {
        const temp = await commentService.getAllCommentsBySongId(songId, size);
        setComments(temp.content)
        setNumberElement(temp.numberOfElements)
        setTotalElements(temp.totalElements)
    }

    const handleCloseComment = () => {
        callOpenComment(false);
    }

    const handleOpenReplyBox = (commentId) => {
        setIsReply(true);
        setCommentId(commentId);
    }

    const onSubmitComment = async (data) => {
        const newComment = {
            content: data.content,
            song: playSongList[songIndexList],
        };
        urlSocketRef.current = "/app/sendComment";
        try {
            await commentService.saveComment(newComment);
            const socket = new SockJS(`${BASE_URL}/ws`);
            const stompClient = over(socket);
            stompClient.connect({}, () => {
                stompClient.send(urlSocketRef.current, {}, JSON.stringify(newComment));
                console.log("urlSocket ở create: ", urlSocketRef.current)
            });
            toast.dark("Đăng tải thành công!");
            await getAllCommentBySong(songId, size);
            resetComment();
        } catch (error) {
            toast.error("Thất bại!");
        }
        newComment.content = '';
        newComment.song = null;
    };

    // Submit reply
    const onSubmitReply = async (data) => {
        const newReply = {
            content: data.replyContent,
            parentComment: JSON.parse(data.parentComment),
        };
        newReply.parentComment.replies = null;
        urlSocketRef.current = "/app/sendComment";
        try {
            await commentService.saveComment(newReply);
            const socket = new SockJS(`${BASE_URL}/ws`);
            const stompClient = over(socket);
            stompClient.connect({}, () => {
                stompClient.send(urlSocketRef.current, {}, JSON.stringify(newReply));
                console.log("urlSocket ở create: ", urlSocketRef.current)
            });
            toast.dark("Đăng tải thành công!");
            await getAllCommentBySong(songId, size);
            resetReply();
            setIsReply(false); // Reset trạng thái reply
            setCommentId(null); // Xóa commentId
        } catch (error) {
            toast.error("Thất bại!");
        }
        newReply.content = '';
        newReply.parentComment = null;
    };

    const handleLikeComment = async (comment) => {
        try {
            const hasLike = comment.likes?.some((like) => like.user.userId === userId);
            if (!hasLike) {
                await commentService.likeComment(comment.commentId);
                await getAllCommentBySong(songId, size);
            }
        } catch (error) {
            toast.error("fail")
        }
    }

    const handleDislikeComment = async (comment) => {
        try {
            const hasDislike = comment.dislikes?.some((dislike) => dislike.user.userId === userId);
            if (!hasDislike) {
                await commentService.dislikeComment(comment.commentId);
                await getAllCommentBySong(songId, size);
            }
        } catch (error) {
            toast.error("fail")
        }
    }

    const handleHahaComment = async (comment) => {
        try {
            const hasHaha = comment.hahas?.some((haha) => haha.user.userId === userId);
            if (!hasHaha) {
                await commentService.hahaComment(comment.commentId);
                await getAllCommentBySong(songId, size);
            }
        } catch (error) {
            toast.error("fail")
        }
    }

    const handleWowComment = async (comment) => {
        try {
            const hasWow = comment.wows?.some((wow) => wow.user.userId === userId);
            if (!hasWow) {
                await commentService.wowComment(comment.commentId);
                await getAllCommentBySong(songId, size);
            }
        } catch (error) {
            toast.error("fail")
        }
    }

    const handleHeartComment = async (comment) => {
        try {
            const hasHeart = comment.hearts?.some((heart) => heart.user.userId === userId);
            if (!hasHeart) {
                await commentService.heartComment(comment.commentId);
                await getAllCommentBySong(songId, size);
            }
        } catch (error) {
            toast.error("fail")
        }
    }

    const handleRemoveEmotionComment = async (commentId) => {
        try {
            await commentService.removeEmotionComment(commentId);
            await getAllCommentBySong(songId, size);
        } catch (error) {
            toast.error("fail")
        }
    }

    const timeAgo = (dateTimeString) => {
        const now = new Date();
        const commentDate = new Date(dateTimeString);
        const differenceInSeconds = Math.floor((now - commentDate) / 1000);

        const intervals = [
            {label: 'giây', seconds: 1},           // 1 giây
            {label: 'phút', seconds: 60},          // 60 giây
            {label: 'giờ', seconds: 3600},         // 60 phút
            {label: 'ngày', seconds: 86400},       // 24 giờ
            {label: 'tháng', seconds: 2592000},    // 30 ngày
            {label: 'năm', seconds: 31536000}      // 365 ngày
        ];

        for (let i = intervals.length - 1; i >= 0; i--) {
            const interval = intervals[i];
            if (differenceInSeconds >= interval.seconds) {
                const count = Math.floor(differenceInSeconds / interval.seconds);
                return `${count} ${interval.label} trước`;
            }
        }

        return 'Vừa mới';
    };

    const loadMoreComment = () => {
        setSize(size + 10);
    }

    const handleLoadMoreReplies = async (index, commentId, repliesSize) => {
        const newReplies = await commentService.getAllRepliesByParentCommentId(commentId, repliesSize + 5);
        const updatedComments = comments.map((comment, idx) => {
            if (idx === index) {
                return {...comment, replies: newReplies};
            }
            return comment;
        });
        setComments(updatedComments);
    }

    const userHasEmotion = (comment) => {
        const hasLike = comment.likes?.some((like) => like.user.userId === userId);
        const hasDislike = comment.dislikes?.some((dislike) => dislike.user.userId === userId);
        const hasHeart = comment.hearts?.some((heart) => heart.user.userId === userId);
        const hasHaha = comment.hahas?.some((haha) => haha.user.userId === userId);
        const hasWow = comment.wows?.some((wow) => wow.user.userId === userId);

        if (hasLike) {
            return 'like';
        }
        if (hasDislike) {
            return 'dislike';
        }
        if (hasHeart) {
            return 'heart';
        }
        if (hasHaha) {
            return 'haha';
        }
        if (hasWow) {
            return 'wow';
        }

        return '';
    }

    return (
        <Container withShadow={false} className={isOpenComment ? 'comment active-comment' : 'comment'}>
            <Flex justifyContent={'between'} alignItems={'center'} className={'comment-header'}
                  gd={{
                      height: '10%'
                  }}
            >
                <Button theme="reset" text="" icon={<IoIosArrowUp size={22}/>}
                        gd={{
                            borderRadius: '50%',
                            backgroundColor: 'rgba(204,204,204,0.4)',
                            width: '40px',
                            height: '40px',
                            position: "relative",
                        }}
                        onClick={handleCloseComment}
                />
                <Typography tag={'h3'}>{totalElements} BÌNH LUẬN</Typography>
            </Flex>
            <Group className={'comment-content'}
                   gd={{
                       background: "rgba(62,41,73,0.88)",
                       borderRadius: 25,
                       height: '80%',
                       padding: 10
                   }}
            >
                {
                    comments && comments.map((comment, index) => {
                        const userEmotion = userHasEmotion(comment);
                        return (
                            <Group className={'comment-element'} key={comment.commentId}>
                                <Flex justifyContent={'start'} alignItems={"start"}>
                                    <Avatar size={40} src={comment.user.avatar}></Avatar>
                                    <Group gap={10} gd={{width: '80%', lineHeight: 0.6}}>
                                        <Flex>
                                            <Typography tag={'p'}
                                                        gd={{fontSize: '0.9rem'}}>{comment.user.fullName}</Typography>
                                            <Typography tag={'p'}
                                                        gd={{fontSize: '0.7rem'}}>{timeAgo(comment.createdAt)}</Typography>
                                        </Flex>
                                        <Typography tag={'p'} gd={{fontSize: '.8rem', color: '#ccc'}}
                                        >{comment.content}</Typography>
                                        <Flex justifyContent={'start'} gd={{width: "100%", position: 'relative'}}
                                              alignItems={"center"}>
                                            <Flex className={'select-emotion'} gd={{width: "35%"}}>
                                                <Button theme="reset" text={
                                                    userEmotion === 'like' ?
                                                        <Typography tag={'span'}
                                                                    gd={{color: '#17b6d1', fontSize: '.7rem', padding: '0 3px'}}
                                                        >Đã thích</Typography>
                                                        :
                                                        userEmotion === 'dislike' ?
                                                            <Typography tag={'span'}
                                                                        gd={{color: '#ccc', fontSize: '.7rem', padding: '0 3px'}}
                                                            >Không thích</Typography>
                                                            :
                                                            userEmotion === 'heart' ?
                                                                <Typography tag={'span'}
                                                                            gd={{color: '#ec255a', fontSize: '.7rem', padding: '0 3px'}}
                                                                >Yêu thích</Typography>
                                                                :
                                                                userEmotion === 'haha' ?
                                                                    <Typography tag={'span'}
                                                                                gd={{color: '#f6b619', fontSize: '.7rem', padding: '0 3px'}}
                                                                    >Haha</Typography>
                                                                    :
                                                                    userEmotion === 'wow' ?
                                                                        <Typography tag={'span'}
                                                                                    gd={{color: '#f6b619', fontSize: '.7rem', padding: '0 3px'}}
                                                                        >Wow</Typography>
                                                                        :
                                                            <Typography tag={'span'}
                                                                        gd={{fontSize: '.7rem', padding: '0 3px'}}
                                                                        onClick={()=>handleLikeComment(comment)}
                                                            >Thích</Typography>

                                                }
                                                        onClick={() => handleRemoveEmotionComment(comment.commentId)}
                                                />

                                                <Flex className={'emotion-button'}>
                                                    <Button theme="reset"
                                                            onClick={() => handleLikeComment(comment)}
                                                            icon={<img src={like} alt="haha" height={18}/>}/>
                                                    <Button theme="reset" icon={<img src={love} alt="haha"
                                                                                     height={18}/>}
                                                            onClick={() => handleHeartComment(comment)}
                                                    />
                                                    <Button theme="reset"
                                                            icon={<img src={haha} alt="haha" height={18}/>}
                                                            onClick={() => handleHahaComment(comment)}
                                                    />
                                                    <Button theme="reset"
                                                            icon={<img src={wow} alt="haha" height={18}/>}
                                                            onClick={() => handleWowComment(comment)}
                                                    />
                                                    <Button theme="reset"
                                                            onClick={() => handleDislikeComment(comment)}
                                                            icon={<img src={dislike} alt="haha" height={18}/>}/>
                                                </Flex>
                                            </Flex>
                                            <Button theme="reset"
                                                    gd={{padding: '0 10px', width: '20%'}}
                                                    text={
                                                        <Typography tag={'span'} gd={{fontSize: '.7rem'}}>Phản
                                                            hồi</Typography>
                                                    }
                                                    onClick={() => handleOpenReplyBox(comment.commentId)}
                                            />
                                            <Flex justifyContent={'start'} gap={1} alignItems={"center"} gd={{width: "45%"}}>
                                                {
                                                    comment.likes &&
                                                    <Flex className={"emotion-number"}>
                                                        <Button theme="reset"
                                                                icon={<img src={like} height={18} alt="like"/>}/>
                                                        <Typography tag={'span'} className={'total-emotion'} >
                                                            {comment.likes.length}</Typography>
                                                    </Flex>
                                                }
                                                {
                                                    comment.hearts &&
                                                    <Flex className={"emotion-number"}>
                                                        <Button theme="reset"
                                                                icon={<img src={love} height={18} alt="love"/>}/>
                                                        <Typography tag={'span'} className={'total-emotion'} >
                                                            {comment.hearts.length}</Typography>
                                                    </Flex>
                                                }
                                                {
                                                    comment.hahas &&
                                                    <Flex className={"emotion-number"}>
                                                        <Button theme="reset"
                                                                icon={<img src={haha} height={18} alt="haha"/>}/>
                                                        <Typography tag={'span'} className={'total-emotion'} >
                                                            {comment.hahas.length}</Typography>
                                                    </Flex>

                                                }
                                                {
                                                    comment.wows &&
                                                    <Flex className={"emotion-number"}>
                                                        <Button theme="reset"
                                                                icon={<img src={wow} height={18} alt="wow"/>}/>
                                                        <Typography tag={'span'} className={'total-emotion'} >
                                                            {comment.wows.length}</Typography>
                                                    </Flex>
                                                }
                                                {
                                                    comment.dislikes &&
                                                    <Flex className={"emotion-number"}>
                                                        <Button theme="reset"
                                                                icon={<img src={dislike} height={18} alt="wow"/>}/>
                                                        <Typography tag={'span'} className={'total-emotion'} >
                                                            {comment.dislikes.length}</Typography>
                                                    </Flex>
                                                }
                                            </Flex>
                                        </Flex>

                                    </Group>
                                </Flex>
                                {comment.replies?.content && comment.replies.content?.length > 0 && (
                                    <div style={{marginLeft: 20}}>
                                        {comment.replies?.content.map(reply => (
                                            <ReplyComponent
                                                key={reply.commentId}
                                                comment={reply}
                                                userId={userId}
                                                handleOpenReplyBox={handleOpenReplyBox}
                                                onSubmitReply={onSubmitReply}
                                                registerReply={registerReply}
                                                handleSubmitReply={handleSubmitReply}
                                                isReply={isReply}
                                                commentId={commentId}
                                                handleLikeComment={handleLikeComment}
                                                handleDislikeComment={handleDislikeComment}
                                                handleHahaComment={handleHahaComment}
                                                handleWowComment={handleWowComment}
                                                handleHeartComment={handleHeartComment}
                                                handleLoadMoreReplies={handleLoadMoreReplies}
                                                repliesSize={comment.replies?.size || 0}
                                                commentIndex={index}
                                                timeAgo={timeAgo}
                                                userHasEmotion={userHasEmotion}
                                                handleRemoveEmotionComment={handleRemoveEmotionComment}
                                            />
                                        ))}
                                    </div>
                                )}
                                {
                                    comment.replies?.numberOfElements === 5 &&
                                    comment.replies?.totalElements - comment.replies?.numberOfElements > 0 &&
                                    <Typography tag={'span'} gd={{fontSize: '.8rem', marginLeft: 40}}
                                                onClick={() => handleLoadMoreReplies(index, comment.commentId, comment.replies?.size)}
                                    >
                                        Xem thêm {
                                        comment.replies?.totalElements - comment.replies?.numberOfElements < 5 ?
                                            comment.replies?.totalElements - comment.replies?.numberOfElements : 5
                                    } phản hồi nữa...
                                    </Typography>
                                }

                                {isReply && comment.commentId === commentId &&
                                    <Form onSubmit={handleSubmitReply(onSubmitReply)}
                                          gd={{
                                              display: 'flex',
                                              justifyContent: 'start',
                                              alignItems: 'center',
                                              height: '50px',
                                              background: "transparent",
                                              margin: 0
                                          }}>
                                        <Label>
                                            <Input placeholder={userId === 0 ? "Đăng nhập để bình luận" : "Nhập gì đó đi"}
                                                   disabled={userId === 0}
                                                   {...registerReply('replyContent', {
                                                       required: "Không được để trống!"
                                                   })}
                                                   gd={{height: '30px', border: 'none'}}
                                            />
                                        </Label>
                                        <Label>
                                            <Input type={'hidden'}
                                                   {...registerReply('parentComment')}
                                                   value={JSON.stringify(comment)}
                                                   gd={{height: '30px', border: 'none'}}
                                            />
                                        </Label>
                                        <Button type={'submit'}
                                                gd={{
                                                    background: '#52416a',
                                                    height: '30px',
                                                    fontSize: '.7rem',
                                                    border: 'none',
                                                    marginLeft: 10
                                                }} text={"Đăng tải"}></Button>
                                    </Form>
                                }
                            </Group>
                        )
                    })}
                {numberElement === 10 && totalElements - numberElement > 0 &&
                    <Typography tag={'span'} gd={{fontSize: '.9rem', marginLeft: 10}} onClick={loadMoreComment}>
                        Xem thêm {totalElements - numberElement <= 10 ? (totalElements - numberElement) : 10} bình luận
                        nữa...
                    </Typography>
                }
            </Group>
            <Form onSubmit={handleSubmitComment(onSubmitComment)}
                  gd={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      height: '10%',
                      background: "transparent",
                      margin: 0
                  }}>
                <Label>
                    <Input placeholder={userId === 0 ? "Đăng nhập để bình luận" : "Nhập gì đó đi"}
                           disabled={userId === 0}
                           {...registerComment('content', {
                               required: "Không được để trống!"
                           })}
                    />
                </Label>
                <Button type={'submit'} gd={{background: '#52416a', border: "none", marginLeft: 10}}
                        text={"Đăng tải"}></Button>
            </Form>
        </Container>
    )
}