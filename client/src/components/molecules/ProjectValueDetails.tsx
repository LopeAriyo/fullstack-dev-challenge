import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'

interface Props {
    value: number
}

const ProjectValueDetails = ({value}: Props) => {
  return (
    <Center>
        <Box  bgColor="blue400" w="90%" p={4}>
            <Flex direction="column" justifyContent='center' alignItems='center'>
                <Text color="blue600" fontWeight="bold">Future investment value in 50 years: </Text>
                <Text color="white" fontSize="4xl" fontWeight="bold"> £{(value).toFixed(2)}</Text>
            </Flex>
        </Box>
    </Center>
  )
}

export default ProjectValueDetails