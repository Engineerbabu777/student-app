

import React from 'react'
import { Box, Flex } from '@chakra-ui/react';
import SearchStudent from './SearchStudent';
import StudentsNum from './StudentsNum';

interface Props {

}

const TopLeftBox = (props: Props) => {
    return (
        <Flex flexDirection={{base:'column',md:'row'}} gap={{base:4,md:12}} alignItems={'center'} justifyContent={'flex-start'} flexGrow={1}>
            
            {/* SEARCH */}
            <SearchStudent />

            {/* STUDENT COLLECTION */}
            <StudentsNum />

            


        </Flex>
    )
}

export default TopLeftBox
