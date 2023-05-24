import { Stack, Checkbox} from "@chakra-ui/react";
import {toast} from 'react-hot-toast';
import {useRecoilState} from 'recoil';
import { studentState, StudentTypes } from '@/recoil/studentatom';
import React, {useState } from 'react';
import { StudentInterface } from "@/models/Student";
import { PaginationAtom } from '@/recoil/paginationatom';

const FilterCheckbox = () => {
    const [studentStateOn,setStudentState] = useRecoilState(studentState);
    const [filter , setFilter] = useState([]);
    const [pagination , setPagination] = useRecoilState(PaginationAtom);

  
    

    // FUNCTION TO FILTER THROUGH CHECK BOXEX!
    const FilterThrough = async (filteringArray: string[]) => {
        // WILL BRING THE LOADER!
        toast.success("FILTERING YAY!!");
        
          setTimeout(() => {
            const array = studentStateOn.initialStateStudents.filter((obj) => filteringArray.every(group => obj['groups'].includes(group)))
            setPagination((prev) => ({...prev,loadingState:true}))
           
            setStudentState((prev)  => ({
              ...prev,
              loading: false,
              students: array as [StudentInterface] | [],
            }));

            // SETTING LENGHT FOR BUTTONS!
            setPagination((prev) => ({...prev,numberOfButtons:Math.ceil(array.length/5)}));
            // BUTTONS CREATOR! // AND CHECKS IF NUMBERS OF STUDENTS GREATER THAN 0
            setPagination((prev) => ({...prev,buttonsDisplayer: Array.from({ length:Math.ceil(array.length/5)}, (_, index) => index + 1) })) 
            
            setPagination((prev) => ({...prev , paginatedData:array.slice((pagination.currentPage-1)*5,(pagination.currentPage-1)*5+pagination.perPageList)}))
            setPagination((prev) => ({...prev,loadingState:false}));

          }, 250);

        }
      
      


       // GROUPS ADDING/REMOVING FUNCTION!
       const groupAddRemove = async(val:string) => {
        setPagination((prev) => ({...prev,loadingState:true}))
        setStudentState((prev) => ({...prev,loading:true,students:[]}));

         // CHECKS IF INCLUDES!   
        if(filter.includes(val as never)){
           const newFilter = filter.filter((g)=> g!==val);
        
           // CHANGE !
           setFilter(newFilter);
           // FUNCTION CALL FOR FILTER!
           FilterThrough(newFilter);
           
        } else {

            const newFilter: string[] = [...filter , val] as string[];
            
           // CHANGE !
            setFilter(newFilter as never[]);
           // FUNCTION CALL FOR FILTER!
            FilterThrough(newFilter);
        }

    }

    return (
        <Stack display={'flex'} gap={4} mt={4} justifyContent={'flex-start'} color={'gray.600'} fontWeight={'semibold'} px={1}>
                <Checkbox colorScheme='red' onChange={()=> {groupAddRemove('Typography')}}>
                    Typography
                </Checkbox>

                <Checkbox colorScheme='red' onChange={()=> groupAddRemove('Biologists')}>
                    Biologists
                </Checkbox>

                <Checkbox colorScheme='red' onChange={()=> groupAddRemove('Chemistry Capital')}>
                    Chemistry Capital
                </Checkbox>

                <Checkbox colorScheme='red' onChange={()=> groupAddRemove('Web Designers')}>
                    Web Designers
                </Checkbox>

                <Checkbox colorScheme='red' onChange={()=> groupAddRemove('Black Magicians')}>
                    Black Magicians
                </Checkbox>

        </Stack>
    )
}


export default FilterCheckbox;