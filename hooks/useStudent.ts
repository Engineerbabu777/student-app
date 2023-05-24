


import { useState, useEffect } from "react";
import {useRecoilState} from 'recoil';
import {studentState} from '@/recoil/studentatom';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import { Types } from 'mongoose';
import { PaginationAtom } from '@/recoil/paginationatom';

const useFetch = async(userID:string|undefined) => {
  
  const [studentStateOn,setStudentState] = useRecoilState(studentState);
  const [pagination , setPagination] = useRecoilState(PaginationAtom);

  useEffect(()=> {
       
    // if(studentStateOn.Query){
          getStudents();
    // }

  },[])

  // FUNCTION TO GET USERS
        const getStudents = async() => {
            setPagination((prev) => ({...prev,loadingState:true}))
            setStudentState((prev)=> ({...prev,loading:true}))

            try{
                await axios.get('/api/student?userId='+userID)
                 .then(({data})=> {
                  //  setPagination((prev) => ({...prev,loading:false}))
                    setStudentState(prev => ({...prev, initialStateStudents:data.studentDocuments}));
                    setStudentState((prev) => ({...prev , students:data.studentDocuments,enrolledStudents: data.studentDocuments.length}));
                    
                    // SETTING LENGHT FOR BUTTONS!
                    setPagination((prev) => ({...prev,numberOfButtons:Math.ceil(data.studentDocuments.length/5)})) 
                    // BUTTONS CREATOR! // AND CHECKS IF NUMBERS OF STUDENTS GREATER THAN 0
                    setPagination((prev) => ({...prev,buttonsDisplayer: Array.from({ length:Math.ceil(data.studentDocuments.length/5)}, (_, index) => index + 1) })) 
                    
                    // FIRST INDEX!
                    setPagination((prev) => ({...prev, firstIndex: (pagination.currentPage-1)*5}));
                    setPagination((prev) => ({...prev, lastIndex: (pagination.currentPage-1)*5+pagination.perPageList}))
                    setPagination((prev) => ({...prev , paginatedData:data.studentDocuments.slice((pagination.currentPage-1)*5,(pagination.currentPage-1)*5+pagination.perPageList)}))
                    
                    setPagination((prev) => ({...prev,loadingState:false}));
                    setStudentState((prev)=> ({...prev,loading:false}));
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

  return {deleteStudent,getStudents};
};

export default useFetch;