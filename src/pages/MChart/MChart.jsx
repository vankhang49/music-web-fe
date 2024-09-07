import {Container, Group, Typography} from "lvq";
import './MChart.scss'
import {LineChart} from "../../components/Chart/LineChart";

function MChart(props) {
    return (
        <Container withShadow={false}>
            <Typography tag="h1" className="title-m-chart">M-Chart</Typography>
            <Group className="M-Chart">
                <LineChart/>
            </Group>
        </Container>
    );
}

export default MChart;