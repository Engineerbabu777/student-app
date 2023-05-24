import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Checkbox,
    Flex,Box,Text
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import {toast} from 'react-hot-toast';
import {format} from 'date-fns';
import {ClipLoader} from 'react-spinners';
import {useRecoilState} from 'recoil';
import {studentState} from '@/recoil/studentatom';
import useFetch from '@/hooks/useStudent';
import {MdDeleteForever} from 'react-icons/md';
import { Types } from 'mongoose';
import { PaginationAtom } from '@/recoil/paginationatom';



const RightBottom = () => {

    const {data:session} = useSession();
    const Student = useFetch(session?.user?.id as string|undefined);
    const [checked , setChecked] = useState(false);
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
       {console.log(stu?._id)}
    <Tr fontWeight={'semibold'} fontSize={'10pt'} _hover={{ bg: 'green.200' }} key={ind}>
       <Td fontSize={{base:'0.65em',md:'10pt'}}>
           <Flex gap={4} alignItems={'center'}>
            

               <Checkbox colorScheme='orange' size={{base:'sm',md:'md'}} onChange={()=> setChecked(!checked)}/>
               <motion.div whileTap={{ scale: 0.5 }} whileHover={{scale:1.8, transition: { duration: 0.3 }}} >
                   <Link href={'/students/edit?u='+stu?._id}>
                      
                       <Box bg={'red.200'} borderRadius={50} style={{position:"relative"}} w={{base:5,md:8}} h={{base:5,md:8}} overflow={'hidden'} >
                           <Image src={stu?.image as string} alt={'user-image'} fill style={{objectFit:"cover"}} />
                       </Box>
                       
                   </Link>
               </motion.div>

            {/* DELETE-ICON ONLY IF CHECKED*/}
           {<AnimatePresence><motion.div whileHover={{scale: 3, transition: { duration: 0.3 }}}><MdDeleteForever fontSize={14} color={'red'}  cursor={'pointer'} onClick={()=> {get(stu?._id)}}/></motion.div></AnimatePresence> }

           </Flex>
       </Td>
       <Td fontSize={{base:'0.65em',md:'10pt'}}>{stu?.name}</Td>
       <Td fontSize={{base:'0.65em',md:'10pt'}}>{stu?.gender}</Td>
       <Td fontSize={{base:'0.65em',md:'10pt'}}>{stu?.city}, {format(new Date(stu?.DOB), 'MM/dd/yyyy')}</Td>
       <Td fontSize={{base:'0.65em',md:'10pt'}} >
        { (stu?.groups.length === 1) && <>{stu?.groups[0]}</> }
        {/* IF LENGHT IS LESS THAN 2 THEN OK  OR IF LENGHT GREATER THAN 2 THEN SHOW and more*/}
         { (stu?.groups?.length > 1) && (<>{(stu?.groups.length === 2) ? (<>{stu?.groups[0]}, {stu?.groups[1]}</>):(<>{stu?.groups[0]}, {stu?.groups[1]} <Link href={'/'} className="text-orange-400">{stu?.groups.length-2} and more</Link></>)}</>)}

       </Td>
   </Tr>
   </>

)   ) 

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