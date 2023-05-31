
import { Text, Flex, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AuthState } from '@/recoil/authatom';
import { useRecoilState } from 'recoil';

export default function ResetPassword({ }) {

    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [changePasswordLoading, setChangePasswordLoading] = useState(false);
    const [authModalState, setAuthModalState] = useRecoilState(AuthState);

    const [id, setId] = useState('');

    const [password, setPassword] = useState({
        newPassword: '',
        confirmNewPassword: '',
    })

    // FUNCTION TO RESET PASSWORD!
    const resetPasswordReq = async () => {

        if (!email) {
            toast.error("Fill It Dear BAcha!!!!");
            return;
        }

        setLoading(true);

        // REQUEST TO CHECK IF EMAIL EXITS OR NOT!
        await axios.post('/api/reset', { email })
            .then(({ data }) => {
                setId(data.user._id);
                setChangePasswordLoading(true);

                setLoading(false);
            })
            .catch(({ response }) => {

                toast.error(response.data.message);
                setLoading(false);
            })

    }

    // FUNCTION TO CHANGE OUR PASSWORDS!
    const changesSubmit = async () => {

        // IF ANY ONE IS EMPTY!
        if (!password.newPassword || !password.confirmNewPassword) {
            toast.error("One of the fields is empty!");
            return;
        }

        // CHECKS FOR BOTHS ARE SAME!
        if (password.newPassword !== password.confirmNewPassword) {
            toast.error("Passwords don't matched!");
            return;
        }

        // POST REQUEST TO SAVE DATA!
        await axios.put('/api/reset', { password: password.newPassword, id })
            .then(() => {

                toast.success("Password Updated 🤩🥳🤩!!");

                // CLOSING OUR MODAL STATE!
                setAuthModalState((prev) => ({ ...prev, open: false }));
                setChangePasswordLoading(false);
            })

    }

    return (<Flex alignItems={'center'} gap={2} justifyContent={'center'} flexDirection={'column'} >

        {changePasswordLoading ? (<>

            {/* IT MEANS THAT YOU ARE ENTERING NEW PASSWORDS */}
            <Text color={'blue.600'} fontSize={'10pt'} textAlign={'center'}>Enter Your New Password</Text>

            <Input placeholder={'New Password'} maxWidth={'270px'} mt={2} value={password.newPassword}
                onChange={(e) => setPassword((prev) => ({ ...prev, newPassword: e.target.value }))}
            />

            <Input placeholder={'Confirm New Password'} maxWidth={'270px'}
                mt={2} value={password.confirmNewPassword}
                onChange={(e) => setPassword((prev) => ({ ...prev, confirmNewPassword: e.target.value }))}
            />

            <Button bg={loading ? 'green.500' : 'orange.400'} color={'white'}
                onClick={changesSubmit} isLoading={loading} loadingText={'Verifying'}
                _hover={{ bg: 'orange.200' }} >Confirm Changes</Button>

        </>) : (<>

            {/* HERE MEANS YOU ARE ASKING FOR EMAIL TO CHNAGE PASSWORD! */}
            <Text color={'blue.600'} fontSize={'10pt'}
                textAlign={'center'}>Enter your email to change your password</Text>

            <Input placeholder={'youremail@gmail.com'} maxWidth={'270px'}
                mt={2} value={email} onChange={(e) => setEmail(e.target.value)} />

            <Button bg={loading ? 'green.500' : 'orange.400'} color={'white'}
                onClick={resetPasswordReq} isLoading={loading} loadingText={'Verifying'}
                _hover={{ bg: 'orange.200' }} >Submit Email</Button>

        </>)}


    </Flex>);

}