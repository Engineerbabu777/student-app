


import { AuthState } from '@/recoil/authatom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, Text
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import Login from '@/components/Authentication/Login/Login';
import SignUp from '@/components/Authentication/SignUp/SignUp';
import ResetPassword from '@/components/Authentication/ResetPassword/ResetPassword';
import { Toaster } from 'react-hot-toast';
import { FcStumbleupon } from 'react-icons/fc';


const AuthModalComponent = () => {
  const [authState, setAuthState] = useRecoilState(AuthState);

  const handleClose = () => {

    // CLOSE THE MODAL!
    setAuthState((prev) => ({
      ...prev,
      open: false
    }));

  }
  return (
    <>
      <Toaster />


      <Modal isOpen={authState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader textAlign={'center'} display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'}>
            
            {/* HEADER ACCORD. TO ( VIEW ) */}
            {authState.view === 'login' && <Text fontWeight={'semibold'} fontSize={'2rem'} mb={4}>Login</Text>}
            {authState.view === 'register' && <Text fontWeight={'semibold'} fontSize={'2rem'} mb={4}>Sign Up</Text>}
            {authState.view === 'reset' && <Text fontWeight={'semibold'} fontSize={'1.8rem'} mb={4}>Password Reset</Text>}

{/* STUDENT_APP LOGO  */}
            <FcStumbleupon fontSize={85} />

          </ModalHeader>

          <ModalCloseButton />

          <ModalBody py={5}>

            {/* BODY FOR MODAL */}
            {authState.view === 'login' && <Login />}
            {authState.view === 'register' && <SignUp />}
            {authState.view === 'reset' && <ResetPassword />}

            
            {/* FORGOTT PASSWORD! */}
           { !(authState.view === "reset") && <Text textAlign={'center'} mt={2} color={'orange.500'} 
             display={'flex'} gap={2} alignItems={'center'} 
             fontSize={'12pt'} justifyContent={'center'}>Have you Forgot your password?<Text cursor={'pointer'} 
             color={'blue.300'} _hover={{color:'blue.500'}} onClick={() => setAuthState(({view:'reset',open:true}))}>Reset</Text></Text>
            } 

          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

export default AuthModalComponent;