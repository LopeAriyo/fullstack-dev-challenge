import React, {useState}  from 'react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from '../templates/Default'
import ProjectionChart from '../molecules/ProjectionChart'

import ProjectionForm from '../organisms/ProjectionForm'
import ProjectValueDetails from '../molecules/ProjectValueDetails'

const HomePage = () => {
    const [chartData, setChartData] = useState({
        xAxis: [],
        yAxis: [],
    })

    const [futureInvestmentValue, setFutureInvestmentValue] = useState(0)

    return (
        <DefaultLayout>
            <Container pt={6}>
                <ProjectionChart
                    title="Savings Over Time"
                    xAxisData={chartData.xAxis}
                    yAxisData={chartData.yAxis}
                    xLabel="Years"
                    yLabel="Amount"
                />
            </Container>
            <ProjectionForm setChartData={setChartData} setFutureInvestmentValue={setFutureInvestmentValue}/>
            {futureInvestmentValue > 0 && 
                <ProjectValueDetails value={futureInvestmentValue}/>
            }
        </DefaultLayout>
    )
}

export default HomePage