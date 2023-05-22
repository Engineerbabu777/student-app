
import { useSession, signIn, signOut } from "next-auth/react"
import Login from '@/components/Login';
import Layout from '@/components/Layout';
import Body from "@/components/Mainbody/Body";


export default function Home() {
  const { data: session ,status:sessionStatus} = useSession();

  // IF PREV-SESSION NOT EXISTS! 
  if(!session){
    return <Login />
  }

  return (
        <>

        <Layout>

          {/* MAIN-BOX */}
          <Body />

        </Layout>
        
        </>
  )
}
