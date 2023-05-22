

import React from 'react'
import {
    Container, Box, Text, Menu, Button, Icon,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react';
import SearchStudent from './SearchStudent';
import StudentsNum from './StudentsNum';
import TopLeftBox from './TopLeftBox';
import TopRightBox from './TopRightBox';


interface Props {

}

const TopBox = (props: Props) => {
    return (
        <>
            <Box  display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={4} px={{base:4,md:1}}>

                {/* SEARCH + STUDENTS TOTAL */}
             <TopLeftBox />

                {/* PAGENATION */}
             <TopRightBox />

            </Box>
        </>
    )
}

export default TopBox
