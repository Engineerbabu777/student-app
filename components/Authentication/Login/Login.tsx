

import React,{useState} from 'react'
import { Box, Text, Input, Button } from '@chakra-ui/react';
import {useRecoilState} from 'recoil';
import { AuthState } from '@/recoil/authatom';
import {signIn} from 'next-auth/react';
import {toast} from 'react-hot-toast';

type Props = {}

export default function Login(){

    const [authState,setAuthState] = useRecoilState(AuthState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LoginUser = async() => {
      
        // VERIFY FOR INVALID FIELDS!
        if(!email || !password){
            toast.error('One or more fields are empty! msut be fields');
            return;
          }
         
    
          // VALIDATE EMAIL!
          const isValidEmail = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email);
          if(!isValidEmail){
            toast.error("Invalid Email, Try another one.")
            return;
          }
    
          // VALIDATE PASSWORD!
          if (password.length < 8) {
            toast.error("Incorrect Password!")
            return;
          }


       // MOVE NEXT!
        const response:any = await signIn("credentials",{
          email: email,
          password: password,
          redirect: false,
        })

        if(response.error){
            toast.error(response.error);
            return;
        }
  
      }

  return (
    <Box mx={'auto'} maxWidth={'300px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={2} >
   
     <Input placeholder={'Email'} 
     value={email} 
     required
     onChange={(e) => {setEmail(e.target.value)}} 
     type={'email'}/>

    <Input placeholder={'Password'} 
     value={password}  
     required
     onChange={(e) => {setPassword(e.target.value)}} 
     type={'password'} />

    <Button _hover={{bg:'green.300'}} bg={'blue.300'} color={'white'} height={'34px'} mt={2} width={'100%'} onClick={LoginUser}>Login</Button>
    <Text color={'gray.400'} display={'flex'} gap={2} mt={4}>Not a Member ?<Text textDecoration={'underline'} cursor={'pointer'} _hover={{color:'gray.200'}} fontWeight={'bold'} color={'gray.500'} onClick={() => {setAuthState((prev)=> ({...prev,view:'register'}))}}>Register Account</Text></Text>
</Box>
  )
}
