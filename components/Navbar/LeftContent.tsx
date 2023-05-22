

import { Container, Box, Text, Flex } from '@chakra-ui/react';


const LeftContent = () => {

  return (
    <>
      <Flex direction={'column'} gap={1}>

        {/* UPPER_TEXT */}
        <Text fontWeight={'bold'} fontSize={'22pt'} color={'orange.400'} >SAF</Text>
        {/* UPPER_TEXT */}
        <Text fontSize={'11pt'} display={{ base: 'none', md: 'flex' }} fontWeight={'semibold'} mt={-2} color={'#acb2b8'}>Student Administration FrameWork</Text>

      </Flex>


    </>
  )
}

export default LeftContent;