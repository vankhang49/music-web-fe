import {useRef} from "react";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler } from "chart.js";

import { Line} from 'react-chartjs-2';

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
    const chartRef = useRef(null);
    const data = {
        labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'],
        datasets: [
            {
                data: [30, 33, 66, 99, 70, 50, 57, 72, 69, 90, 66, 42, 30],
                label: "Top1",
                borderColor: "#3e95cd",
                pointBackgroundColor: "#fff",
                pointBorderColor: "#3e95cd",
                pointRadius: 0.5,
                pointHoverRadius: 8,
                borderWidth: 4,
                hoverBorderWidth: 5,
                fill: false
            },
            {
                data: [20, 30, 50, 80, 75, 40, 30, 33, 66, 80, 62, 50, 40],
                label: 'Top2',
                borderColor: "#8e5ea2",
                pointBackgroundColor: "#fff",
                pointBorderColor: "#8e5ea2",
                pointRadius: 0.5,
                pointHoverRadius: 8,
                borderWidth: 4,
                hoverBorderWidth: 5,
                fill: false
            },
            {
                data: [15, 35, 70, 55, 60, 35, 30, 40, 50, 60, 55, 35, 37],
                label: "Top3",
                borderColor: "#3cba9f",
                pointBackgroundColor: "#fff",
                pointBorderColor: "#3cba9f",
                pointRadius: 1,
                pointHoverRadius: 8,
                borderWidth: 4,
                hoverBorderWidth: 5,
                fill: false
            }
        ]
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
            legend: {
                display: false, // Ẩn legend
                position: "bottom"
            }
        }
    }

    const onClick = (event) => {
        // if (getElementAtEvent(chartRef.current, event).length > 0) {
        //     const clickDatasetIndex = getElementAtEvent(chartRef.current, event)[0].datasetIndex;
        //     const dataPoint = getElementAtEvent(chartRef.current, event)[0].index;
        //     const link = data.datasets[clickDatasetIndex].link[dataPoint];
        //     window.open(link, '_blank');
        // }
    };

    return (
        <Line
            ref={chartRef}
            data={data}
            options={options}
            onClick={onClick}
        />
    )
        ;
}