

import React,{useState,useEffect} from 'react'
import { Input, InputGroup, InputLeftElement,Text,Box } from '@chakra-ui/react'
import {AiOutlineSearch} from 'react-icons/ai';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {studentState} from '@/recoil/studentatom';

interface Props {

}

const SearchStudent = (props: Props) => {

  // const [query, setQuery] = useState('');
  const [studentStateOn,setStudentState] = useRecoilState(studentState);
  const [query, setQuery] = useState('');

  
  // LIVE SEARCH FILTER WITH EACH CHANGE ON INPUT...
  const handleInputChange = ():void => {
     
    if(query){
  
      const handleChange = async() =>{

        setStudentState((prev=> ({...prev,loading:true,Query:false})))
    
        
        if(!query){
  
          setStudentState((prev=> ({...prev,loading:false,Query:true,students:studentStateOn.initialStateStudents})))
          return;
        
        } else{
          
          await axios.get('/api/student?userId=12&query='+query)
          .then(({data}) => {
            
            setStudentState((prev=> ({...prev,students:data.studentSearch,loading:false})));
    
           })
    
          }
    
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
