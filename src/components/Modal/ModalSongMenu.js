import {Button, Card, Flex, Group, Modal, Typography} from "lvq";
import style from "./ModalSongMenu.module.scss"
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {IoBan, IoHeartOutline} from "react-icons/io5";
import {IoIosAddCircleOutline, IoIosArrowForward, IoIosLink} from "react-icons/io";
import {PiMicrophoneStage, PiMusicNotesPlusLight} from "react-icons/pi";
import {MdNextPlan} from "react-icons/md";
import {HiOutlineSignal} from "react-icons/hi2";
import {RiShareForwardLine} from "react-icons/ri";

const ModalSongMenu = ({ isOpen, onClose, song}) => {
    useEffect(() => {
        console.log(isOpen);
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} displayCoat = {false} idControl={`active-song-menu-${song.songId}`}
               gd={{
                   padding: "0.5rem",
                   position: "absolute",
                   zIndex: 1,
                   maxWidth: 250,
                   minWidth: 200,
                   maxHeight: 500,
                   minHeight: 400,

        }}
        >
            <Group className={style.modalHeader}>
                    <Card long sizeImg={40}
                          srcImg={song.coverImageUrl}
                          title={song.title}
                          description={
                              song.artists?.map((artist, index) => (
                                  <Link key={artist.artistId} to={`/artists/${artist.artistId}`}>
                                      {artist.artistName}
                                      {index !==  song.artists.length - 1 && <span>, </span>}
                                  </Link>))
                          }
                    >
                    </Card>
                    <Flex center justifyContent={"center"} alignItems={"center"} className={style.buttonMenu}>
                        <Button theme={'reset'}
                                text={<Flex justifyContent={"center"} gap={0} alignItems={'center'} column>
                                        <PiMicrophoneStage />
                                        <Typography tag={'span'}>Lời bài hát</Typography>
                                    </Flex>
                                }>
                        </Button>
                        <Button theme={'reset'}
                                text={<Flex justifyContent={"center"} gap={0} alignItems={'center'} column>
                                    <IoBan />
                                    <Typography tag={'span'}>Chặn</Typography>
                                </Flex>
                                }>
                        </Button>
                    </Flex>
            </Group>
            <Group className={style.modalBody}>
                <ul>
                    <li><IoHeartOutline />Thêm vào thư viện</li>
                    <li><PiMusicNotesPlusLight  />Thêm vào danh sách phát</li>
                    <li><MdNextPlan  />Phát tiếp theo</li>
                    <li><HiOutlineSignal  />Phát nội dung tương tự</li>
                    <li><IoIosAddCircleOutline  />Thêm vào Playlist
                        <Button theme={'reset'} icon={<IoIosArrowForward size={18} />}></Button></li>
                    <li><IoIosLink  />Sao chép link</li>
                    <li><RiShareForwardLine  />Chia sẻ <Button theme={'reset'} icon={<IoIosArrowForward size={18} />}></Button></li>
                </ul>
                <Typography tag={'span'}>Cung cấp bởi {song.provide}</Typography>
            </Group>
        </Modal>
    );
}

export default ModalSongMenu;