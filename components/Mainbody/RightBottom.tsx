import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Checkbox,
    Flex,Box
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React, {useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {ClipLoader} from 'react-spinners';
import {useRecoilState} from 'recoil';
import {studentState} from '@/recoil/studentatom';
import useFetch from '@/hooks/useStudent';
import { Types } from 'mongoose';
import { PaginationAtom } from '@/recoil/paginationatom';
import TableComponent from './TableBody/TableComponent';


const RightBottom = () => {

    const {data:session} = useSession();
    const Student = useFetch(session?.user?.id as string|undefined);
    const [studentStateOn,setStudentState] = useRecoilState(studentState);
    const [pagination , setPagination] = useRecoilState(PaginationAtom);

    useEffect(()=> {

    },[pagination])
    
    const get = async(id: Types.ObjectId) => {
        const {deleteStudent:deleteuser} = await Student;
        deleteuser(id);
    }

    return (

        <Box display={'flex'} flexGrow={1} ml={{base:0,lg:10}} overflow={'scroll'}
        sx={
            { 
           '::-webkit-scrollbar':{
                  display:'none'
              }
           }
         }
        >
            <AnimatePresence>

                <TableContainer  width={'100%'}  overflow={'scroll'} sx={
            { 
           '::-webkit-scrollbar':{
                  display:'none'
              }
           }
         }>
                    <Table variant='simple'  >
                        <Thead >
                            <Tr color={'red.500'} >
                                <Th ><Checkbox size={{base:'sm',md:'md'}} colorScheme='orange'/></Th>
                                <Th color={'gray.300'} fontSize={{base:'0.65em',md:'10pt'}}>NAME</Th>
                                <Th color={'gray.300'} fontSize={{base:'0.65em',md:'10pt'}}>SEX</Th>
                                <Th color={'gray.300'} fontSize={{base:'0.65em',md:'10pt'}}>PLACE AND DATEOFBIRTH</Th>
                                <Th color={'gray.300'} fontSize={{base:'0.65em',md:'10pt'}}>GROUPS</Th>
                            </Tr>
                        </Thead>
<Tbody >

{ (!pagination?.loadingState && pagination?.paginatedData?.length > 0) && pagination?.paginatedData?.map((stu,ind) => (
    <>
     <TableComponent key={ind} ind={ind} stu={stu} get={get}/>
    </>
)  ) 

}

</Tbody>
                       

                    </Table>

{ pagination?.loadingState && <Flex w={'100%'} h={'100'} justifyContent='center' alignItems={'center'}><ClipLoader size={40} color={'blue'}/></Flex> }
                </TableContainer>

            </AnimatePresence>
            
        </Box>
    )
}

export default RightBottom;