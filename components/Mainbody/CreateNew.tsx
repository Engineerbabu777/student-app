


import React from 'react'
import { ButtonGroup, Button, Flex } from '@chakra-ui/react';
import {BiEdit} from 'react-icons/bi';
import Link from 'next/link';

interface Props {
    
}

const CreateNew = ({}: Props) => {
    return (
        <Link href={'/students/new'} >
            <Flex >

            <button type={'button'} className={" px-3 py-1 text-white bg-[#2dc1d8] "}>
                {/* ICON */}
                <BiEdit fontSize={20}/>
            </button>

            <button type={'button'} className={"bg-[#2CD3E1] px-6 py-1 text-white  "}>
                {/* TEXT */}
                New
            </button>
            
            </Flex>
        </Link>
    )
}

export default CreateNew
