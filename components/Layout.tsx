


import React, { ReactElement } from 'react'
import { Container, Box, Text } from '@chakra-ui/react';
import Navbar from '@/components/Navbar/Navbar';
import {Toaster} from 'react-hot-toast';
interface Props {
   children: React.ReactNode
}

function Layout({children}: Props): ReactElement {
   
    return (
        <Box     sx={
            { 
           '::-webkit-scrollbar':{
                  display:'none'
              }
           }
         }>
            <Toaster />

            {/* NAVBAR */}
            <Navbar />
            
            {/* CHILDREN */}
            {children}
            
        </Box>
    )
}

export default Layout
