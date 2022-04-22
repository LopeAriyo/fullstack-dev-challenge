import React, {useState} from 'react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from '../templates/Default'
import ProjectionChart from '../molecules/ProjectionChart'

import ProjectionForm from '../organisms/ProjectionForm'
import ProjectValueDetails from '../molecules/ProjectValueDetails'


const HomePage = () => {
 
     const [projections, setProjectionData] = useState({
        years: [0],
        balances: [0],
     })

    const potentialBalance = projections.balances[projections.balances.length-1]
    

    return (
            <DefaultLayout>
                <Container pt={6}>
                    <ProjectionChart
                        title="Savings Over Time"
                        xAxisData={projections.years}
                        yAxisData={projections.balances}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
                <ProjectionForm 
                setProjectionData={setProjectionData}
                 />
                {potentialBalance > 0 && 
                    <ProjectValueDetails 
                        value={potentialBalance}
                    />
                } 
            </DefaultLayout>
    )
}

export default HomePage