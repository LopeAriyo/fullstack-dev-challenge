import { ChartLegendOptions, ChartOptions } from 'chart.js'
import React from 'react'
import {  Bar } from 'react-chartjs-2'
import theme from '../../theme'

type Props = {
    xAxisData: number[] | string[]
    yAxisData: number[]
    title?: string
    xLabel?: string
    yLabel?: string
}

const ProjectionChart = ({ xAxisData, yAxisData, title, xLabel, yLabel }: Props) => {
    
    const legendOptions: ChartLegendOptions = {
        display: false,
    }

    const options: ChartOptions = {
        title: {
            display: !!title,
            text: title,
        },
        scales: {
            gridLines: { display: false },
            yAxes: [
                {
                    scaleLabel: { display: !!yLabel, labelString: yLabel },
                    gridLines: { display: false },
                },
            ],
            xAxes: [
                {
                    scaleLabel: { display: !!xLabel, labelString: xLabel },
                    ticks: { display: true },
                    gridLines: { display: false },
                },
            ],
        },
    }

    return (
        <Bar
            data={{
                labels: xAxisData,
                datasets: [
                    {
                        backgroundColor: theme.colors.text,
                        borderColor: theme.colors.primary,
                        data: yAxisData,
                    },
                ],
            }}
            options={options}
            legend={legendOptions}
        />
    )
}

export default ProjectionChart
