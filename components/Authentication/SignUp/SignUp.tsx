



import React,{useState} from 'react'
import { Box, Text, Input, Button } from '@chakra-ui/react';
import {useRecoilState} from 'recoil';
import { AuthState } from '@/recoil/authatom';
import {signIn} from 'next-auth/react';
import axios from 'axios';
import {toast} from 'react-hot-toast';


type Props = {}

export default function SignUp() {


    const [authState,setAuthState] = useRecoilState(AuthState);
    const [loading, setLoading] = useState(false);
    const [userDetails , setUserDetails] = useState({
      username: '',
      email: '',
      password: '',
    })

    

    const RegisterUser = async() => {
      setLoading(true);
      // VERIFY FOR INVALID FIELDS!
      if(!userDetails.email || !userDetails.password || !userDetails.username){
        toast.error('One or more fields are empty! msut be fields');
      setLoading(false);
        return;
      }
     

      // VALIDATE EMAIL!
      const isValidEmail = (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(userDetails.email);
      if(!isValidEmail){
        toast.error("Invalid Email, Try another one.");
      setLoading(false);

        return;
      }

      // VALIDATE USERNAME!
      if (userDetails.username.length < 3) {
        toast.error("Username must have 3 or more Characters");
      setLoading(false);

        return;
      }

      // VALIDATE PASSWORD!
      if (userDetails.password.length < 8) {
        toast.error("Password must be 8 Characters long!");
      setLoading(false);
        return;
      }

      // SEEMS ALL GOOD MOVE NEXT!
      try{
        await axios.post(
          "/api/register",
          { username:userDetails.username, email:userDetails.email, password:userDetails.password }
        )
        .then(() => {
           toast.success('User added! to Database');

        })

      } catch (err: any) {
        // EMAIL EXITS!
         if(err.response.data.exists.email){
          toast.error("Email already registerd , try another.")
         }

      }
      setLoading(false);
    }

  return (
    <Box mx={'auto'} maxWidth={'300px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={2} >
    
    <Input placeholder={'Username'} 
     required
     value={userDetails.username} 
     onChange={(e) => {setUserDetails((prev) => ({...prev,username:e.target.value}))}} 
     type={'text'} />

    <Input placeholder={'Email'} 
     value={userDetails.email} 
     required
     onChange={(e) => {setUserDetails((prev) => ({...prev,email:e.target.value}))}} 
     type={'email'}/>

    <Input placeholder={'Password'} 
     value={userDetails.password}  
     required
     onChange={(e) => {setUserDetails((prev) => ({...prev,password:e.target.value}))}} 
     type={'password'} />

    <Button onClick={() => {RegisterUser()}} isLoading={loading} loadingText={'Saving User'} 
    _hover={{bg:'green.300'}} bg={loading ? 'green.400': 'blue.300'} color={'white'} height={'34px'} mt={2} 
    width={'100%'}>Sign Up</Button>
    <Text color={'gray.400'} display={'flex'} gap={2} mt={4}>Already have an account? <Text textDecoration={'underline'} cursor={'pointer'} _hover={{color:'gray.200'}} fontWeight={'bold'} color={'gray.500'} onClick={() => {setAuthState((prev)=> ({...prev,view:'login'}))}}>Login</Text></Text>
    
    </Box>
  )
}
