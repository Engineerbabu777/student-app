
import { useSession, signIn, signOut } from "next-auth/react"
import { FcGoogle, FcStumbleupon } from 'react-icons/fc';
import React, { useState } from 'react';
import { ClipLoader } from "react-spinners";
import { MdEmail } from 'react-icons/md';
import { Text, Flex } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { AuthState } from '@/recoil/authatom';
import AuthModalComponent from '@/modals/authModal';

const Login = ({ }): React.JSX.Element => {
  const { data: session, status: sessionStatus } = useSession();
  const [loading, setIsLoading] = useState(false);
  const [authModalState, setAuthModalState] = useRecoilState(AuthState);

  if (!session && sessionStatus === 'loading') {
    return <div className="flex items-center justify-center h-screen w-screen"><ClipLoader color={'red'} size={42} /></div>;
  }


  return (
    <>
      <AuthModalComponent />
      <div className="bg-blue-100 w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <div className="flex justify-center items-center min-w-[350px] py-4 flex-col gap-2 pb-7 rounded-lg bg-blue-200">
          <FcStumbleupon fontSize={85} />
          <div className="w-4/5 flex flex-col gap-4 justify-center text-center">

            {/* LOGIN WITH OAUTH */}
            <button type={'button'} className={`px-3 transition-all duration-300 hover:bg-black hover:text-white bg-slate-100 font-semibold w-full   py-2 rounded-full text-xl flex gap-2 items-center justify-center hover:shadow-lg ${loading ? ' text-blue-300 ' : ''}`}
              onClick={() => { setIsLoading(true); signIn('google') }} >
              {loading ? <ClipLoader color={'blue'} size={24} /> : <FcGoogle fontSize={26} />} Login with Google</button>


            <Flex justifyContent={'center'} alignItems={'center'}>
              <hr className="w-2/4 mx-2  h-[1px] bg-black" /> OR
              <Text fontWeight={'semibold'} fontSize={'13pt'} color={'red.600'}>
              </Text>
              <hr className="w-2/4 h-[1px] bg-black mx-2" />
            </Flex>


            {/* WITH CUSTOM CREDENTIALS */}
            <button type={'button'} className={`px-3 bg-slate-100 transition-all duration-300 hover:bg-black hover:text-white font-semibold w-full   py-2 rounded-full text-xl flex gap-2 items-center justify-center hover:shadow-lg ${authModalState.open ? ' text-blue-300 ' : ''}`}
              onClick={() => { setAuthModalState((prev) => ({ view: 'login', open: true })) }} >
              {<MdEmail fontSize={26} />} Login with Email</button>

            <button type={'button'} className={`px-3 bg-slate-100 transition-all duration-300 hover:bg-black hover:text-white font-semibold w-full   py-2 rounded-full text-xl flex gap-2 items-center justify-center hover:shadow-lg ${authModalState.open ? ' text-blue-300 ' : ''}`}
              onClick={() => { setAuthModalState(({ view: 'register', open: true })) }} >
              {<MdEmail fontSize={26} />} SignUp with Email</button>

          </div>

        </div>
      </div>

    </>
  )
}

export default Login;