

import React,{useState,useEffect} from 'react'
import { Input, InputGroup, InputLeftElement,Text,Box } from '@chakra-ui/react'
import {AiOutlineSearch} from 'react-icons/ai';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {studentState} from '@/recoil/studentatom';
import { PaginationAtom } from '@/recoil/paginationatom';
import {toast} from 'react-hot-toast';
import {useSession} from 'next-auth/react';
import useFetch from '@/hooks/useStudent';

interface Props {

}

const SearchStudent = (props: Props) => {

  const [studentStateOn,setStudentState] = useRecoilState(studentState);
  const [pagination , setPagination] = useRecoilState(PaginationAtom);
  const {data:session} = useSession();
  const Student = useFetch(session?.user?.id as string|undefined);

  const [query, setQuery] = useState('');

// FUNCTION FROM HOOK!
  const getAllUsers = async() => {
    const {getStudents} = await Student;
    getStudents();
  }

  useEffect(()=> {
     // MAKE A REQUEST AND SET ALL TO INITIALSTATE!
     if(session?.user?.id){
       getAllUsers();
     }

  },[!query]);

  // LIVE SEARCH FILTER WITH EACH CHANGE ON INPUT...
  const handleInputChange = ():void => {
     
    if(query){
  
      const handleChange = async() =>{

        setStudentState((prev=> ({...prev,loading:true,Query:false})));
        setPagination((prev) => ({...prev, loadingState:true}));
        
          
          await axios.get('/api/student?userId=12&query='+query)
          .then(({data}) => {
            
            setStudentState((prev=> ({...prev,students:data?.studentSearch,loading:false})));

            // SETTING LENGHT FOR BUTTONS!
            setPagination((prev) => ({...prev,numberOfButtons:Math.ceil(data?.studentSearch?.length/5)}));
            // BUTTONS CREATOR! // AND CHECKS IF NUMBERS OF STUDENTS GREATER THAN 0
            setPagination((prev) => ({...prev,buttonsDisplayer: Array.from({ length:Math.ceil(data?.studentSearch?.length/5)}, (_, index) => index + 1) })) 
            
            setPagination((prev) => ({...prev , paginatedData:data?.studentSearch?.slice((pagination?.currentPage-1)*5,(pagination?.currentPage-1)*5+pagination?.perPageList)}))
            setPagination((prev) => ({...prev,loadingState:false}));

    
           })
    
      }
      

      handleChange();

    }
  }
  

  useEffect(()=> {

    handleInputChange();

  },[query]);


    return (
        <>

        <Box display={'flex'} gap={1} flexDirection={'column'} w={{base:'100%',md:'auto'}} >
                <Text fontSize={'10pt'} fontWeight={'semibold'} color={'gray.400'}>SEARCH FOR NAME</Text>
              <InputGroup w={{base:'100%',md:'200px'}} onClick={() => console.log('needs to open moadla')}>
                <InputLeftElement>
                <AiOutlineSearch fontSize={22} color={'white'} />
                </InputLeftElement>
                <Input type='text' placeholder='Search...' bg={'gray.200'} value={query} onChange={(e)=>setQuery(e.target.value)}/>
              </InputGroup>
        </Box>

        </>
    )
}

export default SearchStudent
