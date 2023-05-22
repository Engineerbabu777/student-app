

import { Container, Box, Text } from '@chakra-ui/react';
import LeftContent from '@/components/Navbar/LeftContent';
import RightContent from '@/components/Navbar/RightContent';


const Navbar = () => {


    return (
        <>
            <Box w={'100'} h={{ base: '60px', md: '120px' }}  position="static"  display={'flex'} px={{ base: 4, md: 12 }} justifyContent={'space-between'} alignItems={'center'}>

                {/* LEFT CONTENT */}
                <LeftContent />

                {/* RIGHT CONTENT */}
                <RightContent />
            </Box>
        </>
    )
}

export default Navbar;