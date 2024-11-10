import {Button, Card, Container, Flex, Group, Typography} from "lvq";
import {useEffect, useState} from "react";
import {IoIosArrowUp} from "react-icons/io";
import "./NotificationBox.css";
import {Link} from "react-router-dom";
import * as notificationService from "../../core/services/NotificationService";

export function NotificationBox({openNotification, callOpenNotification, notifications}) {
    const [isOpenNotification, setIsOpenNotification] = useState(false)
    const [notificationBs, setNotificationBs] = useState([])
    const url ="http://localhost:3000/"
    const handleCloseNotification = () => {
        callOpenNotification(false);
    }
    useEffect(() => {
        setIsOpenNotification(openNotification);
        setNotificationBs(notifications)
    }, [openNotification]);

    console.log(notificationBs)
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

    return (
        <Container withShadow={false}
                   className={isOpenNotification ? 'notification active-notification' : 'notification'}>
            <Flex justifyContent={'between'} alignItems={'center'} className={'notification-header'}
                  gd={{
                      height: '10%',
                      paddingBottom: '10px'
                  }}
            >
                <Typography tag={'h3'}>{handleCloseNotification} Hôm nay nghe gì</Typography>
                <Button theme="reset" text="" icon={<IoIosArrowUp size={22}/>}
                        gd={{
                            borderRadius: '50%',
                            backgroundColor: 'rgba(204,204,204,0.4)',
                            width: '40px',
                            height: '40px',
                            position: "relative",
                        }}
                        onClick={handleCloseNotification}
                />
            </Flex>
            <Group className={'notification-content'}
                   gd={{
                       background: "rgba(62,41,73,0.88)",
                       borderRadius: 25,
                       height: '90%',
                       padding: 10
                   }}
            >
                {

                    notifications?.map(notification => (
                        <Link to={""+notification.path}>
                            <Card sizeImg={60} srcImg={notification.urlImage}
                                  shape={"square"} gd={{height: "80px", marginTop: "4px"}}
                                  title={<Flex> <Typography tag={'p'}
                                                            gd={{fontSize: '0.9rem',margin:"0",color:"#fff"}}>{notification.title}</Typography> <Typography
                                      tag={'p'}
                                      gd={{color:"#ccc",fontSize: '0.7rem',margin:"0"}}>{timeAgo(notification.createDate)}</Typography></Flex>} long={true}
                                  description={<Typography tag={'p'}
                                                           gd={{color:"#ccc",fontSize: '0.8rem',margin:"0"}}>{notification.content}</Typography>}/>
                        </Link>
                    ))
                }

                {/*<Card sizeImg={60} srcImg={"https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"}*/}
                {/*      shape={"square"} gd={{height: "80px", marginTop: "4ipx"}}*/}
                {/*      title={<Flex> <Typography tag={'p'}*/}
                {/*                                gd={{fontSize: '0.9rem',margin:"0"}}>Nhạc mới Alan Walker</Typography> <Typography*/}
                {/*          tag={'p'}*/}
                {/*          gd={{color:"#ccc",fontSize: '0.7rem',margin:"0"}}>9 giờ trước</Typography></Flex>} long={true}*/}
                {/*      description={<Typography tag={'p'}*/}
                {/*                               gd={{color:"#ccc",fontSize: '0.8rem',margin:"0"}}>"Think Of It All sụ kết hợp bùng nổ của Alan Walker, Joe Jonas và Julia Michael"</Typography>}/>*/}

            </Group>
        </Container>
    );
}