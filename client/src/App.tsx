import React, {useState} from 'react'
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

const tempFutureInvestmentValue = 8500.00

function App() {
    const [initialSavingsAmount, setInitialSavingsAmount] = useState(0)
    const [monthlyDeposit, setMonthlyDeposit] = useState(0)
    const [interestRate, setInterestRate] = useState(0)

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
                            value={initialSavingsAmount}
                            onChange={(value => setInitialSavingsAmount(parseInt(value)))}
                            min={0}
                            step={100} 
                            label="Initial Deposit"
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
                            value={monthlyDeposit}
                            onChange={(value => setMonthlyDeposit(parseInt(value)))}
                            min={0}
                            step={100} 
                            label="Monthly Deposit"
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
                        <Text>Interest Rate</Text>
                        <NumberInput
                                defaultValue={0}
                                value={interestRate}
                                onChange={(value => setInterestRate(parseFloat(value)))}
                                label="Interest Rate"
                                name="interestRare"
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
                <Text>Future Investment Value: {tempFutureInvestmentValue}</Text>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
