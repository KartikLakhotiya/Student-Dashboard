import { Chart } from "react-google-charts";

export const data = [
    [
        "Courses",
        "Count",
        { role: "style" },
        {
            sourceColumn: 0,
            role: "annotation",
            type: "string",
            calc: "stringify",
        },
    ],
    ["MCA", 2, "#b87333", null],
    ["B.Tech", 2, "silver", null],
    ["MBA Tech", 4, "gold", null],
];

export const options = {
    title: "Courses Offered",
    width: 500,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
};

export function BarChart() {
    return (
        <Chart
            chartType="BarChart"
            width="50%"
            height="100px"
            data={data}
            options={options}
        />
    );
}
