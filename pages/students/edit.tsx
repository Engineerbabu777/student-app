

import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout';
import Form from '@/components/Form/Form';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Login from '@/components/LoginPage';

interface Props {

}

const Edit = (props: Props) => {

    const { data: session, status: sessionStatus } = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    if(sessionStatus === 'unauthenticated'){
        router.push('/');
        return <Login />
    }



    // const handle Sumbit Function!
    const handleEdit = async (gender: String, DOB: String, name: String, image: String, groups: [String] | [], city: String, studentID: String) => {

        // UPDATE!!
        try {
            //REQUEST
            await axios.put('/api/student', { gender, DOB, name, image, groups, city, studentID, userId: session?.user?.id })
                .then(({ data }) => {
                    toast.success('Updated Student 😊😊 !')
                })

            setLoading(false);

        } catch (err: any) {
            toast.error(err.message);
        }

        setLoading(false);

    }

    // if (sessionStatus === 'unauthenticated') router.push('/');

    return (
        <>

            {sessionStatus === 'authenticated' && (
                <Layout>

                    <Form edit handleEdit={handleEdit} loading={loading} setLoading={setLoading} />

                </Layout>)
            }

        </>
    )
}

export default Edit;

