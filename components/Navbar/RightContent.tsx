


import { useSession, signIn, signOut } from "next-auth/react"
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

import { BsChevronDown } from 'react-icons/bs';
import Image from 'next/image';
import MenuListItems from './MenuList';

const RightContent = () => {
    const { data: session, status: sessionStatus } = useSession();

    return (
        <Box>
            <Menu>
            { session && (
                <MenuButton display={'flex'} gap={2} outline={{ base: '1px solid gray', md: 'none' }} padding={{ base: 1.4, md: '0' }}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                        {/* IMAGE */}
                        <Box bg='red.500' h={12} w={12} borderRadius={4} display={{ base: 'none', md: 'flex' }}>
                            <Image src={session?.user?.image as string} alt={"pic"} width={'100'} height={'100'} />
                        </Box>
                        <Text fontSize={'10pt'} fontWeight={'semibold'} pr={2} ml={1}>{session?.user?.name}</Text>
                        <BsChevronDown fontSize={10} color={'gray.300'} />
                    </Box>
                </MenuButton>
            )
            }
                {/* MENU LIST */}
                <MenuList>

    <MenuListItems />
    
                </MenuList>
            </Menu>
        </Box>
    )
}

export default RightContent;