

import React from 'react'
import {Box} from '@chakra-ui/react';
import Pagenation from './Pagenation';
interface Props {
    
}

const TopRightBox = (props: Props) => {
    return (
        
        <Box display={{base:'none',md:'flex'}}>

        <Pagenation />

        </Box>
    )
}

export default TopRightBox
