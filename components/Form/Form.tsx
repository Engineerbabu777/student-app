

import { Input, Box, Text, Flex, Button, Stack, Checkbox, CheckboxGroup, InputGroup, VStack, Divider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { BsCloudUploadFill } from 'react-icons/bs';
import axios from 'axios';
import CheckBoxes from '@/components/New/CheckBoxes';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { StudentInterface } from '@/models/Student';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { studentState } from '@/recoil/studentatom';
import { ClipLoader } from 'react-spinners';
// import fs from 'fs';


interface Props {
        edit?: Boolean;
        create?: Boolean;
        handleEdit?: (gender: string, DOB: string, name: string, city: string, groups: [string] | [], image: string, studentID: string) => void;
        handleCreate?: (gender: string, DOB: string, name: string, city: string, groups: [string] | [], image: string) => void;
        setLoading: React.Dispatch<React.SetStateAction<boolean>>;
        loading: boolean;
        type?: String;
}

const Form = ({ edit, create, handleCreate, handleEdit, setLoading, loading, type }: Props) => {

        const [gender, setGender] = useState<string>('');
        const [DOB, setDOB] = useState<string>('');
        const [name, setname] = useState<string>('');
        const [city, setCity] = useState<string>('');
        const [groups, setGroups] = useState<[string] | []>([]);
        const [image, setImage] = useState<string>('');
        const [redirect, setredirect] = useState(false);
        const [imageloading, setimageloading] = useState(false);
        const [studentEdit, setStudentEdit] = useState<StudentInterface | []>([]);
        const [studentStateOn, setStudentState] = useRecoilState(studentState);

        const { data: session, status: sessionStatus } = useSession();
        const router = useRouter();


        useEffect(() => {

                return () => {
                        const getData = () => {
                                if (router?.query?.u) {
                                        const getStudentData = async (id: string) => {
                                                await axios.get(`/api/student?userId=${session?.user?.id}&s=${id}`)
                                                        .then(({ data }) => {

                                                                setStudentEdit(data.studentDocuments);
                                                                setCity(data.studentDocuments.city);
                                                                setname(data.studentDocuments.name);
                                                                setImage(data.studentDocuments.image);
                                                                setDOB(format(new Date(data.studentDocuments.DOB), 'yyyy-MM-dd'))
                                                                setGroups(data.studentDocuments.groups);
                                                                setGender(data.studentDocuments.gender);

                                                        })
                                                        .catch(() => {
                                                                // DISPLAY ERROR !!!!

                                                        })
                                        }
                                        getStudentData(router?.query?.u as string);

                                }
                        }
                        getData();
                }
        }, [router?.query?.u, session?.user?.id]);


        // FUNCTION FOR UPLOADING IMAGE!
        const handleImageUpload = async (data: any) => {

                try {

                        toast.success("Trying to check Image...");
                        const formData = new FormData();
                        formData.append('file', data[0]);
                        formData.append('upload_preset', 'new-data');


                        const response = await axios.post(
                                'https://api.cloudinary.com/v1_1/djo2k58eq/image/upload',
                                formData
                        );

                        setImage(response.data.secure_url);
                        setimageloading(false);

                        toast.success("Image Uploaded");

                } catch (error) {
                        setimageloading(false);
                        toast.error("Image error! use another image!")
                }

        };


        // FUNCTION TO SET FILE!
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

                if (event?.target?.files) {
                        setimageloading(true);
                        const files = event.target.files[0];
                        const newFile: any = [files];
                        handleImageUpload(newFile);
                        toast.success("Image Selected!");
                }

        };

        // AGE VALIDATION!!
        const ValidateDOB = (DOB:string) => {
         // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
	  let optimizedBirthday = DOB.replace(/-/g, "/");

	 //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
	  let myBirthday:any = new Date(optimizedBirthday) as any;
          
	 // calculate age comparing current date and borthday
	  let myAge = ~~((Date.now() - myBirthday) / (31557600000));
         
          return myAge;
        }


        const handleSubmit = () => {
                setLoading(true);

                 
                // VALIDATE FIELDS! (WILL DO NEXT!)
                if (!gender || !DOB || !name || !image || groups.length < 1 || !city) {
                        toast.error(' Form is not Completely Filled... !');
                        toast.error('Fill the Form to Continue....')
                        setLoading(false);
                        return;

                } else {

                        // VALIDATE IMAGE!
                        const validImage = (/\.(jpg|jpeg|png|gif|bmp|svg)$/i).test(image);
                        if(!validImage){
                                if(!image.includes("data:image/jpeg;base64")){
                                        toast.error("Invalid Image!");
                                        setLoading(false);
                                        return; 
                                }
                                
                        };

                        // VALIDDATE NAME!!
                        if(city.length < 3){
                                toast.error("City name must be greater than 2 characters!");
                                setLoading(false);
                                return; 
                        }

                        // VALIDADTE CITY!
                        if(name.length < 3){
                                toast.error("Name lenght must be Greater than 2 Characters");
                                setLoading(false);
                                return; 
                        }

                        // Validate DOBQ!
                        const age = ValidateDOB(DOB);
                        if(age < 10) {
                               toast.error('Invalid Age must be 10 years!');
                               setLoading(false);
                               return;
                         }

                        // SEEMS PASSED ALL CASES NEXT UPLOAD DETAILS!

                        // THEN CALL FUNCTION!
                        if (handleCreate) {

                                // NEEDS TO CREATE!
                                handleCreate(gender, DOB, name, image, groups, city);
                                setCity('');
                                setname('');
                                setImage('');
                                setDOB('')
                                setGroups([]);
                                setGender('');
                                setredirect(true);

                        }

                        //  NEEDS TO EDIT!
                        if (handleEdit) {
                                handleEdit(gender, DOB, name, image, groups, city, router?.query?.u as string);

                        }
                }


        }

        if (redirect) {
                router.push('/')
        }

        return (
                <>
                        {/* CONATINER START */}

                        {/* LINK TO PREVOIUS HOME PAGE */}
                        <Link href='/'>
                                <Text bg={'red.300'} _hover={{ bg: 'red.400', shadow: 'lg' }} display={'flex'} alignItems={'center'} color={'white'} px={2} py={1} my={{ base: 2, md: 1 }} w={{ base: '50px', md: '100px' }} borderRadius={8} mx={3} >
                                        <BiArrowBack fontSize={22} />BACK</Text>
                        </Link>

                        {/* BOX INSEIDER */}
                        <Box display={'flex'} h={'100%'} w={'100%'} justifyContent={'center'} alignItems={'center'} overflow={'auto'}>

                                {/* INNER-2 BOX */}
                                <Flex flexDirection={'column'} bg={'blue.200'} borderRadius={15} justifyContent={'center'} alignItems={'center'} width={{ base: '100%', md: '65%' }} pb={2}>

                                        {/* HEADER */}
                                        <Text textAlign={'center'} fontWeight={'bold'} fontSize={'15pt'} py={3}>{edit ? 'EDIT' : 'ADD'} STUDENT DETAILS</Text>

                                        {/* INPUTS */}
                                        {/* NAME */}
                                        <Input placeholder={'Enter Student Name'} value={name} onChange={(e) => setname(e.target.value)} color={'red.600'} fontWeight={'semibold'} width={{ base: '95%', md: '50%' }} mx='auto' bg={'gray.200'} mb={2} />

                                        {/* CITY-NAME */}
                                        <Input placeholder={'Enter City Name...'} value={city} onChange={(e) => setCity(e.target.value)} color={'red.600'} fontWeight={'semibold'} width={{ base: '95%', md: '50%' }} mx='auto' bg={'gray.200'} mb={2} />

                                        {/* IMAGE-LINK */}

                                        <Flex width={{ base: '95%', md: '50%' }} gap={1}>
                                                <Input placeholder={'Enter Image Link'} value={image} flexGrow={1} onChange={(e) => setImage(e.target.value)} color={'red.600'} fontWeight={'semibold'} width={{ base: '95%', md: '50%' }} mx='auto' bg={'gray.200'} />
                                                <label className="w-10 h-10 bg-green-300  items-center justify-center flex rounded-lg cursor-pointer">
                                                        <input type="file" onChange={handleFileChange} className="hidden" />
                                                        {!imageloading ? <BsCloudUploadFill fontSize={24} /> : <ClipLoader size={24} />}
                                                </label>
                                                {/* SPINNER-LOADER */}
                                        </Flex>

                                        {/* INPUTS-END */}


                                        <Divider my={2} />


                                        {/* EXYRA INFO-BOX */}
                                        <Box >

                                                {/* GENDER */}
                                                <Stack spacing={5} gap={3} direction='row' mt={2} display={'flex'} alignItems={'center'}>

                                                        <Text fontWeight={'semibold'} color={'gray.500'} fontSize={'12pt'}>CHOOSE GENDER: </Text>
                                                        <Checkbox colorScheme='blue' isChecked={gender === 'Male' ? true : false} onChange={(e) => setGender('Male')}>
                                                                MALE
                                                        </Checkbox>

                                                        <Checkbox colorScheme='blue' isChecked={gender === 'Female' ? true : false} onChange={(e) => setGender('Female')}
                                                        >
                                                                FEMALE
                                                        </Checkbox>

                                                </Stack>

                                                {/* DATEOFBIRTH */}
                                                <Stack display={'flex'} gap={4} alignItems={'center'} flexDirection={'row'} >
                                                        <Text fontWeight={'semibold'} color={'gray.500'} fontSize={'12pt'}>DOB:</Text>
                                                        <Input type={'date'} onChange={(e) => { setDOB(e.target.value) }}
                                                                defaultValue={DOB} />
                                                </Stack>
                                        </Box>


                                        <Divider my={2} />

                                        {/* GROUPS(CHECKBOXES) */}
                                        <VStack width={{ base: '95%', md: '50%' }} mx={'auto'} mt={3}>
                                                {/* TEXT */}
                                                <Text fontSize={'11pt'} fontWeight={'bold'}>SELECT STUDIES GROUP</Text>

                                                {/* ALL OPTIONS ( COMPONENT ) */}
                                                <CheckBoxes groups={groups} setGroups={setGroups} />


                                                <Button colorScheme={'green'} width={'100%'} isLoading={loading} loadingText='Saving' onClick={handleSubmit}>
                                                        {create ? 'Save' : 'Update'} Student Information
                                                </Button>
                                        </VStack>

                                </Flex>
                                {/* INNER-2 BOX-END */}

                        </Box>
                        {/* BOX INSEIDER-END */}



                </>
        )
}

export default Form;

