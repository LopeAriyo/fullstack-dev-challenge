import React from 'react'
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react'
import { FormikProps } from 'formik'
import { FormValues } from '../../@types/formValue'


interface Props {
    name: string
    step: number
}

export const ProjectionInput = ({name, step, values, setValues, touched, setTouched}: Props & FormikProps<FormValues>) => {
    return (
        <NumberInput    
        id={name}
        defaultValue={0}
        value={values[name as keyof FormValues]}
        onChange={(value) => setValues({...values,
        [name]: name ==="ratePercentage" ? parseFloat(value) : parseInt(value)}
        )}
        onBlur={(event) => event && setTouched({...touched, [name]: true})}
        min={0}
        step={step} 
        size='sm' 
        w="100%"
        maxW="100%"
        bgColor="white"
        >
            <NumberInputField />
            <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}
