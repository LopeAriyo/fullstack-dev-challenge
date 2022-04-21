import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme} from '@chakra-ui/react'
import theme from './theme'
import HomePage from './components/pages/HomePage'

const defaultTheme = extendTheme(theme)

function App() {
 
    return (
        <ChakraProvider theme={defaultTheme}>
            <HomePage />
        </ChakraProvider>
    )
}

export default App
