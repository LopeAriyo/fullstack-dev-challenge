import React, {  useEffect }  from 'react'
import {VStack, Text, Divider, Box, Center} from '@chakra-ui/react'

import ProjectionFormControl from '../molecules/ProjectionFormControl';
import { useForm } from '../../utils/useForm';
import { fetchProjections } from '../../utils/fetchProjections';
import { formControls } from '../../utils/formControls';

interface ProjectionData {
    years: number[] | never []
    balances: number[] | never[]
}
interface Props {
    setProjectionData: (obj: ProjectionData) => void
}

const ProjectionForm = ({ setProjectionData} : Props) => {

    const form = useForm()

    useEffect(() => {
        
        const fetchData = async () => {
            await fetchProjections(form)
                    .then((projections)=> {

                    const yearData = projections.map((projection: any) => {
                        return projection.year
                    })

                    const balanceData = projections.map((projection:any) => {
                        return projection.balance
                    })


                    if (Object.keys(form.errors).length === 0){
                        setProjectionData({ years: yearData, balances: balanceData })
                    }
                })
                .catch ((error => console.log(error)))
        }

        fetchData()

    }, [form]) 

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