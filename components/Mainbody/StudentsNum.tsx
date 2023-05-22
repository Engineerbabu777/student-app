

import React from 'react'
import { Box, Text, Flex } from '@chakra-ui/react';
import { RiUserLine } from 'react-icons/ri';
import CreateNew from './CreateNew';
import Pagenation from './Pagenation';
import { useRecoilState } from 'recoil';
import { studentState } from '@/recoil/studentatom';

interface Props {

}

const StudentsNum = (props: Props) => {

    const [studentStateOn, setStudentState] = useRecoilState(studentState);


    return (
        <Flex fontWeight={'bold'} fontSize={'10pt'} w={{ base: '100%', md: 'auto' }} pt={{ base: 0, md: 4 }} flexDirection={{ base: 'row', md: 'row' }} justifyContent={{ base: 'space-between', md: 'center' }} alignItems={{ base: 'center', md: 'center' }} color={'gray.700'} gap={{ base: 1, md: 4 }}>

            {/* STUDENTS NUMBERS */}
            <Flex alignItems={'center'} pb={{ base: 1, md: 0 }} gap={4} flexDirection={{ base: 'column', md: 'row' }}>
                {/* ICON */}
                <Flex justifyContent={{ base: 'center', md: 'center' }} alignItems={{ base: 'center', md: 'center' }}>
                    <RiUserLine fontSize={19} color={'black'} />

                    {/* COUNT */}
                    <Text fontSize={{ base: '10pt', md: '10pt' }} color={{ base: 'gray.400', md: 'black' }}>{studentStateOn?.enrolledStudents} STUDENTS</Text>
                </Flex>

                {/* CREATE NEW */}
                <CreateNew />
            </Flex>



            <Box display={{ base: 'flex', md: 'none' }}>

                <Pagenation />

            </Box>

        </Flex>
    )
}

export default StudentsNum;
