

import { Input, Box, Text, Flex, Button, Stack, Checkbox, CheckboxGroup, InputGroup, VStack, Divider } from '@chakra-ui/react';
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import CheckBoxes from '@/components/New/CheckBoxes';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Login from '@/components/LoginPage';
import Form from '@/components/Form/Form';
import {useRouter} from 'next/router';

const NewStudent = () => {

        const [loading, setLoading] = useState<boolean>(false);
        const { data: session, status: sessionStatus } = useSession();
        const router = useRouter();

        //     IMPLEMENT SUBMIT FUNCTION
        const handleCreate = async (gender: String, DOB: String, name: String, image: String, groups: [String] | [], city: String) => {
                setLoading(true);

                //     IMPLEMENT SUBMIT LOGIC
                try {
                        // AXIOS REQUEST!
                        await axios.post('/api/student', {
                                gender, DOB, name, city, groups, image, userId: session?.user?.id
                        })
                                .then(({ data }) => {
                                        setLoading(false);
                                        toast.success('Student Added 😊😊😎!! ');
                                })
                                .catch(({ message }) => {
                                        setLoading(false);

                                        // UNAUTHORIZED REQUEST HANDLED
                                        if (message.includes(401)) {
                                                throw new Error('Unauthorized Request !!');
                                                return;
                                        }
                                        throw new Error('Something went wrong..');
                                })
                } catch (err:any) {
                        toast.error(err);
                }

        }

        // if(sessionStatus === 'unauthenticated'){
        //         router.push('/');
        //         return <Login />
        //     }


        if (sessionStatus === 'unauthenticated') router.push('/')

        return (
                <>

                        {/* IF AUTHENTICATED THEN PROCEEDED */}

                        {sessionStatus === 'authenticated' && (
                                <Layout>

                                        <Form handleCreate={handleCreate} create loading={loading} setLoading={setLoading} />

                                </Layout>
                        )
                        }

                </>
        )
}


export default NewStudent;