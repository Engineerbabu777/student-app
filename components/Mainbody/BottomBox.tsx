

import React from 'react'
import { Box } from '@chakra-ui/react';
import LeftBottom from './LeftBottom';
import RightBottom from './RightBottom';

interface Props {
    
}

const BottomBox = (props: Props) => {
    return (
        <Box  sx={
            { 
           '::-webkit-scrollbar':{
                  display:'none'
              }
           }
         } borderTop={'1px solid'} borderColor={'gray.100'} display={'flex'} pt={3} gap={6}>
{/* LEFT-CONTENT-BOTTOM */}
    <LeftBottom />

{/* RIGHT-CONTENT-BOTTOM */}
   <RightBottom />
        </Box>
    )
}

export default BottomBox
