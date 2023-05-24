
import React,{useState} from 'react';
import {
    Tr,
    Td,
    Checkbox,
    Flex,Box
} from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import {StudentInterface} from '@/models/Student';
import {Types} from 'mongoose';
import { motion, AnimatePresence } from 'framer-motion';
import {MdDeleteForever} from 'react-icons/md';
import {format} from 'date-fns';
import {toast} from 'react-hot-toast';

interface Props {
  ind: number;
  stu: StudentInterface;
  get: (val:Types.ObjectId) => void;
}


const TableComponent = ({ind, stu, get}: Props) => {
    const [checked , setChecked] = useState(false);

    return(
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
            {<motion.div className={`${checked ? 'visible':'invisible'}`} whileHover={{scale: 3, transition: { duration: 0.3 }}}><MdDeleteForever fontSize={14} color={'red'}  cursor={'pointer'} onClick={()=> {get(stu?._id)}}/></motion.div>}
 
            </Flex>
        </Td>
        <Td fontSize={{base:'0.65em',md:'10pt'}} cursor={'pointer'} onClick={()=> toast.success(`Modal With ${stu?.name} Details!`)} >{stu?.name}</Td>
        <Td fontSize={{base:'0.65em',md:'10pt'}} cursor={'pointer'} onClick={()=> toast.success(`Modal With ${stu?.name} Details!`)}>{stu?.gender}</Td>
        <Td fontSize={{base:'0.65em',md:'10pt'}} cursor={'pointer'} onClick={()=> toast.success(`Modal With ${stu?.name} Details!`)}>{stu?.city}, {format(new Date(stu?.DOB), 'MM/dd/yyyy')}</Td>
        <Td fontSize={{base:'0.65em',md:'10pt'}} cursor={'pointer'} onClick={()=> toast.success(`Modal With ${stu?.name} Details!`)} >

         {/* CHECKS IF LENGHT IS ! AND SHOW THAT GROUP */}
         { (stu?.groups.length === 1) && <>{stu?.groups[0]}</> }

         {/* IF LENGHT IS LESS THAN 2 THEN OK  OR IF LENGHT GREATER THAN 2 THEN SHOW and more*/}
          { (stu?.groups?.length > 1) && (<>{((stu?.groups.length) as number === 2) ? (<>{stu?.groups[0]}, {stu?.groups?.[1]}</>):(<>{stu?.groups[0]}, {stu?.groups?.[1]} <Link href={'/'} className="text-orange-400">{(stu?.groups.length)-2} and more</Link></>)}</>)}
 
        </Td>
    </Tr>
    </>
    )

}



export default TableComponent;