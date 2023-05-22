
import { useSession, signIn, signOut } from "next-auth/react"
import {FcGoogle,FcStumbleupon} from 'react-icons/fc';
import React,{useState} from 'react';
import { ClipLoader } from "react-spinners";
interface Props {

}

const Login = ({}:Props):React.JSX.Element => {
  const { data: session ,status:sessionStatus} = useSession();
  const [loading, setIsLoading] = useState(false);

 if(!session && sessionStatus==='loading'){
  return <div className="flex items-center justify-center h-screen w-screen"><ClipLoader color={'red'} size={42}/></div>;
 }
   
  return (
    <>
      <div className="bg-purple-100 w-screen h-screen flex flex-col gap-4 items-center justify-center">
        <div className="flex justify-center items-center flex-col gap-2 pb-7">
        <FcStumbleupon fontSize={75} />
          <button type={'button'} className={`px-3 bg-slate-300 font-semibold  py-2 rounded-2xl text-xl flex gap-2 items-center justify-center hover:shadow-lg ${loading? ' text-blue-300 ': ''}`} 
          onClick={() => {setIsLoading(true); signIn('google')}} >
            { loading ? <ClipLoader color={'blue'} size={24}/> : <FcGoogle fontSize={26}/> } Login with Google</button>
        </div>
      </div>

    </>
  )
}

export default Login;