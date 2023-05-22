


import { useState, useEffect } from "react";
import {useRecoilState} from 'recoil';
import {studentState} from '@/recoil/studentatom';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { Types } from 'mongoose';


const useFetch = async(userID:string|undefined, query:boolean ) => {
  
  const [studentStateOn,setStudentState] = useRecoilState(studentState);


  useEffect(()=> {
       
    if(studentStateOn.Query){
          getStudents();
    }


  },[])

  // FUNCTION TO GET USERS
        const getStudents = async() => {
            
            setStudentState((prev)=> ({...prev,loading:true}))

            try{
                await axios.get('/api/student?userId='+query)
                 .then(({data})=> {
                    setStudentState(prev => ({...prev, initialStateStudents:data.studentDocuments}));
                    setStudentState((prev) => ({...prev , students:data.studentDocuments,enrolledStudents: data.studentDocuments.length}));
                    console.log(data.studentDocuments);

                    setStudentState((prev)=> ({...prev,loading:false}))
                    console.log("OK GOOG")
                 })
            } catch( err:any ) {
                        if(err.message.includes('401')){
                            toast.error('UnAuthorized Request 401 !');
                            return;
                        }
            
                        toast.error(err.message);
                        setStudentState((prev)=> ({...prev,loading:false}))
                }


        }

  // FUNCTION TO GET SEARCH USERS!
     const getStudentsFiltered = () => { }

  // HANDLE DELETE!
     const deleteStudent = async(studentID:Types.ObjectId) => { 
        
         // DELETING!
         await axios.delete('/api/student?id='+studentID)
         .then(({data})=>{
            setStudentState((prev) => ({...prev , students:[]}));
            getStudents();
        })

      }

  return deleteStudent;
};

export default useFetch;