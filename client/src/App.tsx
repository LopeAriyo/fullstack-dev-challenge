import React, {useState, useEffect} from 'react'
import './App.css'
import { ChakraProvider, extendTheme, Flex, Heading, Text, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import * as yup from 'yup';

const defaultTheme = extendTheme(theme)

function App() {

    const requestBodySchema = yup.object().shape({
        initialDeposit: yup.number().positive(),
        monthlyDeposit: yup.number(),
        ratePercentage: yup.number().positive().required()
      })

    const [chartData, setChartData] = useState({
        xAxis: [],
        yAxis: [],
    })

    const [requestBody, setRequestBody] = useState({
        initialDeposit: 0,
        monthlyDeposit: 0,
        ratePercentage: 0.00,
    })

    const [futureInvestmentValue, setFutureInvestmentValue] = useState(0)

    useEffect(() => {

        fetch('http://localhost:3001/api/savings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        }).then(async (res) => {
            let projections = await res.json()
            // await isRequestBodyValid && setFutureInvestmentValue(projections[projections.length-1].balance)

            requestBody.monthlyDeposit > 0 && requestBody.ratePercentage > 0 && setFutureInvestmentValue(projections[projections.length-1].balance)
           
            const xData = projections.map((projection:any) => {
                return projection.year
            })

            const yData = projections.map((projection:any) => {
                return projection.balance
            })


            setChartData({ xAxis: xData, yAxis: yData })
        }).catch ((error => console.log(error)))
    }, [requestBody])

    const handleChange = async (name: string, value: number) => {

        setRequestBody({...requestBody,
                [name]: value 
        })
    
        //Todo: add useEffect
        const isRequestBodyValid = await requestBodySchema.isValid(requestBody)
    
       console.log(isRequestBodyValid)
    }

    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Heading as="h1" paddingBottom="20px" color="text">
                        Interest Rate Calculator
                </Heading>
                <Container pt={6}>
                    <LineChart
                        title="Savings Over Time"
                        xAxisData={chartData.xAxis}
                        yAxisData={chartData.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
                <Flex>
                    {/* {Todo: convert to form to use with formik and yup} */}
                    <Flex>
                        <Text>Initial Deposit</Text>
                        <NumberInput 
                            defaultValue={0}
                            value={requestBody.initialDeposit}
                            onChange={(value) => handleChange("initialDeposit", parseInt(value))}
                            min={0}
                            step={100} 
                            name="initialDeposit"
                            size='sm' 
                            maxW={20}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Flex>
                    <Flex>
                        <Text>Monthly Deposit</Text>
                        <NumberInput 
                            defaultValue={0} 
                            value={requestBody.monthlyDeposit}
                            onChange={(value) => handleChange("monthlyDeposit", parseInt(value))}
                            min={0}
                            step={100} 
                            name="monthlyDeposit"
                            size='sm' 
                            maxW={20}
                        >
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Flex>
                    <Flex>
                        <Text>Interest Rate (%)</Text>
                        <NumberInput
                                defaultValue={0}
                                value={requestBody.ratePercentage}
                                onChange={(value) => handleChange("ratePercentage", parseFloat(value))}
                                name="ratePercentage"
                                precision={2} 
                                min={0}
                                step={0.5}
                                size='sm' 
                                maxW={20}
                            >
                            <NumberInputField />
                            <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput> 
                    </Flex>
                </Flex>
                <Text>Future investment value in 50 years: £{(futureInvestmentValue).toFixed(2)}</Text>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
