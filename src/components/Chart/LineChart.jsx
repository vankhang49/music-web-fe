import {useEffect, useRef, useState} from "react";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from "chart.js";

import {getElementAtEvent, Line} from 'react-chartjs-2';
import {getTop3SongsIn7Days} from "../../core/services/SongService";
import * as songService from "../../core/services/SongService";
import {data} from "autoprefixer";
import {usePlayMusic} from "../../core/contexts/PlayMusicContext";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler
)

export function LineChart() {
    const {
        playSongList,
        addSongList,
        changeSongIndex,
    } = usePlayMusic();
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    const [top3Songs, setTop3Songs] = useState([]);
    const [images, setImages] = useState({});

    const timeLabels = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
    });

    useEffect(() => {
        const fetchData = async() => {
            await getTopThreeSongsInSevenDays();
        }
        fetchData().then().catch(console.error);
    }, []);

    useEffect(() => {
        if (top3Songs.length > 0) {
            const loadImages = async () => {
                const loadedImages = {};
                for (let song of top3Songs) {
                    const songCoverUrl = song.coverImageUrl;
                    if (songCoverUrl && !loadedImages[songCoverUrl]) {
                        const img = new Image();
                        img.src = songCoverUrl;
                        await new Promise(resolve => {
                            img.onload = resolve;
                        });
                        loadedImages[songCoverUrl] = img;
                    }
                }
                setImages(loadedImages);
            };

            loadImages();
        }
    }, [top3Songs]);

    useEffect(() => {
        if (top3Songs.length > 0) {
            const datasets = top3Songs.map((song, index) => {
                const songData = timeLabels.map((labelDate) => {
                    // Kiểm tra và chuyển đổi listen.date thành đối tượng Date hợp lệ
                    const listenForDate = song.songListens.find((listen) => {
                        const listenDate = new Date(listen.dateCreate); // Chuyển đổi listen.date thành đối tượng Date
                        return listenDate.toISOString().split('T')[0] === labelDate; // So khớp ngày
                    });
                    return listenForDate ? listenForDate.total : 0; // Nếu không có dữ liệu cho ngày này, trả về 0
                });

                return {
                    data: songData,
                    label: song.title,
                    borderColor: getColorByIndex(index), // You can define colors based on index
                    pointBackgroundColor: "#fff",
                    pointBorderColor: getColorByIndex(index),
                    pointRadius: 4,
                    pointHoverRadius: 8,
                    borderWidth: 4,
                    hoverBorderWidth: 5,
                    fill: false
                };
            });

            setChartData({
                labels: timeLabels,
                datasets
            });
        }
    }, [top3Songs]);

    const getTopThreeSongsInSevenDays = async () => {
        const temp = await songService.getTop3SongsIn7Days();
        setTop3Songs(temp)
    }

    const getColorByIndex = (index) => {
        const colors = ["#3e95cd", "#8e5ea2", "#3cba9f"];
        return colors[index % colors.length];
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                display: false // Ẩn thanh Y
            }
        },
        plugins: {
            title: {
                display: false // Ẩn title
            },
            tooltip: {
                callbacks: {
                    labelPointStyle: function (tooltipItem) {
                        const songIndex = tooltipItem.datasetIndex;
                        const songCoverUrl = top3Songs[songIndex]?.coverImageUrl;
                        const image = images[songCoverUrl];
                        image.width = 25;
                        image.height = 25;
                        image.borderRadius = 25;
                        if (image) {
                            return {
                                pointStyle: image,
                                zIndex: 2
                            };
                        }
                        return {};
                    }

                },
                usePointStyle: true,
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#fff',
                borderWidth: 1,
                padding: 20,
                boxPadding: 20,
                caretSize: 6,
                cornerRadius: 5,
                position: 'nearest',
            },
            legend: {
                display: false, // Ẩn legend
                position: "bottom"
            }
        }
    }

    const onClick = (event) => {
        // Truy cập biểu đồ từ chartRef
        const chart = chartRef.current;
        if (chart) {
            // Lấy thông tin về các điểm được click
            const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

            if (activePoints.length > 0) {
                const datasetIndex = activePoints[0].datasetIndex;
                handlePlaySong(datasetIndex);
            }
        }
    };


    const handlePlaySong = (index) => {
        if (playSongList !== top3Songs) {
            addSongList(top3Songs);
        }
        changeSongIndex(index);
    };

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <Line
            ref={chartRef}
            data={chartData}
            options={options}
            onClick={onClick}
        />
    )
        ;
}