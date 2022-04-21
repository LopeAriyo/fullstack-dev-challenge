import React, {useState, useEffect} from 'react'
import './App.css'
import { ChakraProvider, extendTheme, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text} from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import { FormikProps, useFormik } from 'formik'
import * as yup from 'yup';

const defaultTheme = extendTheme(theme)

interface RequestBody {
    initialDeposit: number
    monthlyDeposit: number
    ratePercentage: number
}


function App() {

    const [chartData, setChartData] = useState({
        xAxis: [],
        yAxis: [],
    })

    const [futureInvestmentValue, setFutureInvestmentValue] = useState(0)

    const validationSchema = yup.object().shape({
        initialDeposit: yup.number().typeError("Please enter a valid number").positive("Initial deposit must be greater than zero").required("An initial deposit is required"),
        monthlyDeposit: yup.number().typeError("Please enter a valid number").positive("Monthly deposit must be greater than zero").required("A monthly deposit is required"),
        ratePercentage: yup.number().typeError("Please enter a valid percentage").positive("Rate must be greater than zero").required("A rate is required")
      })
    const formik:FormikProps<RequestBody>  = useFormik<RequestBody>({ 
        initialValues: {
            initialDeposit: 0,
            monthlyDeposit: 0,
            ratePercentage: 0.00,
        },
        onSubmit: async (values) => {
            //http request is handled by onChange so no need to use this, however it is required in formik so return nothing
            return
        },
        validationSchema,
    }
    )

    useEffect(() => {
        console.log(formik.errors)
        fetch('http://localhost:3001/api/savings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formik.values),
        }).then(async (res) => {
            let projections = await res.json()
            
            Object.keys(formik.errors).length === 0 ? setFutureInvestmentValue(projections[projections.length-1].balance) : setFutureInvestmentValue(0)
           
            const xData = projections.map((projection:any) => {
                return projection.year
            })

            const yData = projections.map((projection:any) => {
                return projection.balance
            })
            setChartData({ xAxis: xData, yAxis: yData })
        }).catch ((error => console.log(error)))

    }, [formik.values, formik.errors, formik.touched])
 
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
                            <FormControl isInvalid={formik.errors.initialDeposit !== "" && formik.touched.initialDeposit === true}>
                                <FormLabel htmlFor='initialDeposit'>Initial Deposit(£)</FormLabel>
                                <NumberInput   NumberInput 
                                    id="initialDeposit"
                                    defaultValue={0}
                                    value={formik.values.initialDeposit}
                                    onChange={(value) => formik.setValues({...formik.values,
                                    initialDeposit: parseInt(value)}
                                    )}
                                    onBlur={(event) => event && formik.setTouched({...formik.touched, initialDeposit: true})}
                                    min={0}
                                    step={100} 
                                    size='sm' 
                                    maxW={20}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {!formik.touched.initialDeposit &&
                                    <FormHelperText>
                                    Enter the amount for your first deposit
                                    </FormHelperText>
                                }
                                <FormErrorMessage>{formik.errors.initialDeposit}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formik.errors.monthlyDeposit !== "" && formik.touched.monthlyDeposit === true}>
                                <FormLabel htmlFor="monthlyDeposit">Monthly Deposit(£)</FormLabel>
                                <NumberInput 
                                    id="monthlyDeposit"
                                    name="monthlyDeposit"
                                    defaultValue={0}
                                    value={formik.values.monthlyDeposit}
                                    onChange={(value) => formik.setValues({...formik.values,
                                    monthlyDeposit: parseInt(value)}
                                    )}
                                    onBlur={(event) => event && formik.setTouched({...formik.touched, monthlyDeposit: true})}
                                    min={0}
                                    step={100} 
                                    size='sm' 
                                    maxW={20}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {!formik.touched.monthlyDeposit && 
                                (<FormHelperText>
                                    Enter the amount you would like to save monthly
                                </FormHelperText>) }
                                <FormErrorMessage>{formik.errors.monthlyDeposit}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formik.errors.ratePercentage !== "" && formik.touched.ratePercentage === true }>
                                <FormLabel htmlFor="ratePercentage">Interest Rate(%)</FormLabel>
                                <NumberInput 
                                    id="ratePercentage"
                                    defaultValue={0}
                                    value={formik.values.ratePercentage}
                                    onChange={(value) => formik.setValues({...formik.values,
                                        ratePercentage: parseFloat(value)}
                                    )}
                                    onBlur={(event) => event && formik.setTouched({...formik.touched, ratePercentage: true})}
                                    min={0}
                                    step={0.25} 
                                    size='sm' 
                                    maxW={20}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                {!formik.touched.ratePercentage &&
                                    <FormHelperText>
                                    Enter the rate of your savings
                                    </FormHelperText>
                                }
                                <FormErrorMessage>{formik.errors.ratePercentage}</FormErrorMessage>
                            </FormControl>
                        </Flex>
                        {futureInvestmentValue > 0 && 
                <Text>Future investment value in 50 years: £{(futureInvestmentValue).toFixed(2)}</Text>}
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
