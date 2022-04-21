import React from 'react'
import { Box, Heading, Image } from '@chakra-ui/react'
import images from '../../images'

const NavHeader = () => (
    <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        px={6}
        py={4}
        bg="blue100"
    >
        <Image src={images.fullBrandLogo} alt="Finimize" width="160px" />
        <Heading as="h3"  color="text" fontSize="xl">
            Savings Interest Rate Calculator
        </Heading>
    </Box>
)

export default NavHeader
