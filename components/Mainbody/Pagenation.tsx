

import { Box , Text,Flex} from '@chakra-ui/react';
import {useRecoilState} from 'recoil';
import {studentState} from '@/recoil/studentatom';
import {PulseLoader} from 'react-spinners';

const Pagenation = () => {

    const [studentStateOn,setStudentState] = useRecoilState(studentState);

    return(
        <Box  gap={1} borderRadius={4} display={'flex'} overflow={'hidden'} pt={{base:0,md:4}}>
            
            { studentStateOn.loading ? <><PulseLoader size={14} color={'orange'} /></>:<>
            
            <Box bg={'red.200'} px={3} cursor={'pointer'}>1</Box>
            <Box bg={'red.200'} px={3} cursor={'pointer'}>2</Box>
            <Box bg={'red.200'} px={3} cursor={'pointer'}>3</Box>
        
            </>

            }

        </Box>
    )
}

export default Pagenation;