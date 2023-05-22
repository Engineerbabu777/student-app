import { Stack, Checkbox} from "@chakra-ui/react";

const FilterCheckbox = () => {

    return (
        <Stack display={'flex'} gap={4} mt={4} justifyContent={'flex-start'} color={'gray.600'} fontWeight={'semibold'} px={1}>
                <Checkbox colorScheme='red' >
                    Typography
                </Checkbox>

                <Checkbox colorScheme='red' >
                    Biologists
                </Checkbox>

                <Checkbox colorScheme='red' >
                    Chemistry Capital
                </Checkbox>

                <Checkbox colorScheme='red' >
                    Web Designers
                </Checkbox>

                <Checkbox colorScheme='red' >
                    Black Magicians
                </Checkbox>

        </Stack>
    )
}


export default FilterCheckbox;