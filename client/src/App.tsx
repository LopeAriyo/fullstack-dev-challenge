import React, {useState, useEffect} from 'react'
import './App.css'
import { ChakraProvider, extendTheme, Flex, Heading, Text, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'

const defaultTheme = extendTheme(theme)

// Note: This is just for example purposes
// should be replaced with real data from the server
const tempData = {
    xAxis: [0, 1, 2, 3, 4, 5],
    yAxis: [100, 150, 180, 210, 240, 350],
}

function App() {

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
            let data = await res.json()
            requestBody.monthlyDeposit > 0 && requestBody.ratePercentage > 0 && setFutureInvestmentValue(data)
        }).catch ((error => console.log(error)))
    }, [requestBody])

    const handleChange = (name: string, value: number) => {
        setRequestBody({...requestBody,
            [name]: value 
    })}

    return (
        <ChakraProvider theme={defaultTheme}>
            <DefaultLayout>
                <Heading as="h1" paddingBottom="20px" color="text">
                        Interest Rate Calculator
                </Heading>
                <Container pt={6}>
                    <LineChart
                        title="Savings Over Time"
                        xAxisData={tempData.xAxis}
                        yAxisData={tempData.yAxis}
                        xLabel="Years"
                        yLabel="Amount"
                    />
                </Container>
                <Flex>
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
