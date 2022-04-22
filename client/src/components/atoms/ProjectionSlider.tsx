import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { FormikProps } from 'formik'
import React from 'react'
import { FormValues } from '../../types/formValue'

interface Props {
    name: string
    step: number
}

export const ProjectionSlider = ({name, step, values, setValues, touched, setTouched}: Props & FormikProps<FormValues>) => {

    return (
        <Slider
            flex='1'
            focusThumbOnChange={false}
            value={values[name as keyof FormValues]}
            onChange={(value) => setValues({...values, [name]: value })}
            max={10}
            w="60%"
            maxW="100%"
            step={step}
            onBlur={(event) => event && setTouched({...touched, [name]: true})}
        >
            <SliderTrack bgColor="blue300">
            <SliderFilledTrack  bgColor="primary"/>
            </SliderTrack>
            <SliderThumb fontSize='sm' boxSize={8} children={values[name as keyof FormValues]} />
        </Slider>
    )
}
