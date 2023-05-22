import BottomBox from "./BottomBox";
import TopBox from "./TopBox";
import { Box } from '@chakra-ui/react';


interface Props {

}

const Body = () => {

    // FILTER!
    


    return(
        <Box sx={
            { 
           '::-webkit-scrollbar':{
                  display:'none'
              }
           }
         } mt={10} bg={'white'} mx={{ base: '0px', md: 6 }}  px={{base:'1px',md:6}} pt={4} pb={2} gap={4} display={'flex'} flexDirection={'column'}>

        {/* TOP */}
        <TopBox />


        {/* BOTTOM */}
        <BottomBox />


        </Box>
    )
}

export default Body;