import {Button, Card, Flex, Grid, Modal, Typography, useTheme} from "lvq";
import React, {useState} from "react";
import "./ModalSelectTheme.scss";
import defaultImg from "../../assets/images/taylor swift.jpg";
import theme3Img from "../../assets/images/bg-st.jpg";
import theme4Img from "../../assets/images/dua lipa.jpg";

const themeImageList = [
    {
        id: 1,
        name: "default",
        coverImage: defaultImg,
    },
    {
        id: 2,
        name: "theme_3",
        coverImage: theme3Img,
    },
    {
        id: 3,
        name: "theme_4",
        coverImage: theme4Img,
    },
]
const themeColorList = [
    {
        id: 1,
        name: "theme_1",
        backgroundColor: "black",
    },
    {
        id: 2,
        name: "theme_2",
        backgroundColor: "white",
    },
]


export const ModalSelectTheme = ({isOpen, onClose}) => {
    const {theme, setTheme, themeConfig} = useTheme();
    const [themeSelected, setThemeSelected] = useState(theme);

    const handleThemeChange = (theme) => {
        setThemeSelected(theme);
    };

    const handleApply = () => {
        setTheme(themeSelected)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}
               displayCoat={false}
               idControl="modal_select_theme"
               position="relative" gd={{width: "50%", height: 'auto', top: '9%', right: '1%', borderRadius: '10px'}}
               className={`modal-select-theme ${themeSelected}`}
        >
            <Typography tag={'h1'} center >Chủ đề</Typography>
            <Typography tag={'h2'}>Hình ảnh</Typography>
            <Grid columns={1} sm={2} xl={3} gap={6}>
                {themeImageList.map(theme => (
                        <Card srcImg={theme.coverImage || ""}
                              alt={theme.name}
                              onClick={() => handleThemeChange(theme.name)}
                              ratio={"3/2"}
                              key={theme.id}
                              className={`theme-img ${theme.name === themeSelected ? "active" : ""}`}
                        />
                ))}
            </Grid>
            <Typography tag={'h2'}>Màu sắc</Typography>
            <Grid columns={1} sm={2} xl={3} gap={6}>
                {themeColorList.map(theme => (
                    <div onClick={() => handleThemeChange(theme.name)}
                          style={{backgroundColor: theme.backgroundColor}}
                          key={theme.id}
                          className={`theme-bg ${theme.name === themeSelected ? "active" : ""}`}
                    ></div>
                ))}
            </Grid>
            <Flex justifyContent={"center"} alignItems={"center"}>
                <Button text={"Áp dụng"} className={'select-button'} onClick={handleApply}></Button>
            </Flex>
        </Modal>
    );
}