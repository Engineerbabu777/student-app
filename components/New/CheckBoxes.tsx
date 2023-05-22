

import React from 'react'
import { Flex, Checkbox} from '@chakra-ui/react';
import {toast} from 'react-hot-toast';

interface Props {
    groups : [string]|[];
    setGroups :  React.Dispatch<React.SetStateAction<[string] | []>>;
}

const CheckBoxes = ({groups,setGroups}: Props) => {

    // GROUPS ADDING/REMOVING FUNCTION!
    const groupAddRemove = async(val : never) => {
        if(groups.includes(val)) {
            // NEEDS TO REMOVE!
            toast.error("Removed Group")
            const newGroups = groups.filter((g)=> g !== val) as []|[string];
            setGroups(newGroups);

        }else{
            // NEEDS TO ADD!
            toast.success("Added Group")
            let newGroups:React.SetStateAction<[string] | []> = [...groups,val] as React.SetStateAction<[string] | []>;
            setGroups(newGroups);

        }
    }
    
    return (
        <Flex display={'flex'} gap={4} flexWrap={'wrap'} justifyContent={'justify-center'} color={'gray.600'} fontWeight={'semibold'} px={1}>
{/* CHECKSBOXEX */}

        <Checkbox colorScheme='green' 
        onChange={() => groupAddRemove('Typography' as never)}
        isChecked={groups.includes('Typography' as never)}
        >
                Typography
        </Checkbox>

        <Checkbox colorScheme='green' 
          onChange={() => groupAddRemove('Biologists' as never)}
          isChecked={groups.includes('Biologists' as never)}

        >
                Biologists
        </Checkbox>

        <Checkbox colorScheme='green' 
          onChange={() => groupAddRemove('Chemistry Capital' as never)}
          isChecked={groups.includes('Chemistry Capital' as never)}

        >
                Chemistry Capital
        </Checkbox> 

        <Checkbox colorScheme='green' 
          onChange={() => groupAddRemove('Black Magicians' as never)}
          isChecked={groups.includes('Black Magicians' as never)}
        >
                Black Magicians
        </Checkbox> 

        <Checkbox colorScheme='green' 
          onChange={() => groupAddRemove('Web Designers' as never)}
          isChecked={groups.includes('Web Designers' as never)}
        >
                Web Designers
        </Checkbox>

</Flex>
       
    )
}

export default CheckBoxes;
