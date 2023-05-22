
import { Box,Text } from '@chakra-ui/react';
import FilterCheckbox from './Left/FilterCheckBoxes';

interface Props {

}

const LeftBottom = () => {

    return(
        <Box display={{base:'none',lg:'flex'}} flexDirection={'column'} >
            {/* UPPER-TEXT */}
            <Text color={'gray.400'} fontWeight={'semibold'} fontSize={'10pt'}>FILTERS FOR STUDY GROUPS</Text>

            {/* FILTERS-TEXT-CHECKBOXES */}
            <FilterCheckbox />
        
        </Box>

    )
}

export default LeftBottom;