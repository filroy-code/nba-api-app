import {DivergingBarChart} from "@d3/diverging-bar-chart"

export default function BarChart(props) {
    return (
        <div>
            {DivergingBarChart(props.data)}
        </div>
    )
}