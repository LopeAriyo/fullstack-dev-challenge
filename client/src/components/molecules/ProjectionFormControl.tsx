import React from 'react'
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { FormikProps } from 'formik'
import { ProjectionSlider } from '../atoms/ProjectionSlider'
import { FormValues } from '../../@types/formValue'

interface Props {
    name: string
    label: string
    helperText: string
    step: number
}

const ProjectionInput = (props:Props & FormikProps<FormValues> ) => {

    const {name, label, helperText,  errors, touched, step } =  props
    
    return ( 
        <FormControl isInvalid={errors[name as keyof FormValues] !== "" && touched[name as keyof FormValues] === true}>
            <HStack alignContent="left" justifyItems="space-between" w="100%" >
                <FormLabel htmlFor={name} color="blue600" fontSize="sm" fontWeight="medium"  >{label}</FormLabel> 
                {name ==="ratePercentage" ?  
                    <ProjectionSlider {...props} name={name} step={step}  /> : 
                    <ProjectionInput {...props} name={name} step={step}  /> 
                }
                {!touched[name as keyof FormValues] &&
                    <FormHelperText>
                        {helperText}
                    </FormHelperText>
                }
                <FormErrorMessage>{errors[name as keyof FormValues]}</FormErrorMessage>
            </HStack>
        </FormControl>
    )
}

export default ProjectionInput