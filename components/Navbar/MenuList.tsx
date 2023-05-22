


import React from 'react'

import { useSession, signIn, signOut } from "next-auth/react"
import {
   Text, Menu,
    MenuItem,
    MenuDivider,
} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {RiLogoutCircleRLine} from 'react-icons/ri';

interface Props {
    
}

const MenuListItems = (props: Props) => {

    const router = useRouter();
    const {data:session} = useSession();

    return (
        <>
          <MenuItem  >

          {/* PROFILE-ICON */}
          <Image src={`${session?.user?.image}`} alt={'user'} width={18} height={18} />
          <Text fontWeight={'semibold'} ml={2}>Profile</Text>
          </MenuItem>

          <MenuItem onClick={()=> {signOut();router.push('/')}} >

          {/* LOGOUT-ICON */}
          <RiLogoutCircleRLine fontSize={18} color={'red.100'}/>
          <Text ml={2} fontWeight={'semibold'} >Logout</Text>

          </MenuItem>

          <MenuDivider />

          <MenuItem bg={'#47A992'} >
            {/* MODAL TO SHOW DEVELOPER INFO */}
          <Text fontWeight={'semibold'} color={'white'} px={8}>⚙️ Engineer Babu 👼</Text>
          </MenuItem>
        </>
    )
}

export default MenuListItems
