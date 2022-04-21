import React, { useEffect } from 'react'
import {VStack, Text, Divider, Box, Center} from '@chakra-ui/react'

import ProjectionFormControl from '../molecules/ProjectionFormControl';
import {  useForm } from '../../helpers/formik';

interface ChartData {
    xAxis: never[]
    yAxis: never[]
}

interface Props {
    setChartData: (obj: ChartData) => void
    setFutureInvestmentValue: (num: number) => void
}

const ProjectionForm = ({setChartData, setFutureInvestmentValue}: Props) => {

    const form = useForm()
    
    useEffect(() => {
        fetch('http://localhost:3001/api/savings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.values),
        }).then(async (res) => {
            let projections = await res.json()
            
            Object.keys(form.errors).length === 0 ? setFutureInvestmentValue(projections[projections.length-1].balance) : setFutureInvestmentValue(0)
            
            const xData = projections.map((projection:any) => {
                return projection.year
            })

            const yData = projections.map((projection:any) => {
                return projection.balance
            })
            setChartData({ xAxis: xData, yAxis: yData })
        }).catch ((error => console.log(error)))

    }, [form.values, form.errors, form.touched]) 
    

    const formControls = [
        { 
            name: "initialDeposit" ,
            label: "Initial Deposit(£)",
            helperText: "Enter the amount for your first deposit" ,
            step:100},
        { 
            name: "monthlyDeposit" ,
            label: "Monthly Deposit(£)" ,
            helperText: "Enter the amount you would like to save monthly" ,
            step: 100}, 
        {
            name:"ratePercentage" ,
            label: "Interest Rate (%)",
            helperText:"Enter the rate of your savings", 
            step: 0.25 
        }
    ] 

    return (
        <Center>
            <Box bg="blue100" w="90%" p={4}>
                <VStack>
                    <Text>Enter values to generate projection:</Text>
                    <Divider/>
                    <VStack justifyContent='center' alignItems='center ' w="80%">
                        {formControls.map((control)=> (
                            <ProjectionFormControl 
                                key={control.name}
                                name={control.name} 
                                label={control.label}
                                helperText={control.helperText} 
                                step={control.step}
                                {...form}
                            /> 
                        ))}
                    </VStack>
                </VStack>
            </Box>
        </Center>
    )
}

export default ProjectionForm