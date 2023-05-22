

import {atom} from 'recoil';
import {StudentInterface} from '@/models/Student';

// CREATING INTERFACE! 😍
interface StudentTypes {
    students: [StudentInterface] | [];
    Query: Boolean;
    loading: Boolean;
    enrolledStudents: React.ReactNode;
    editGroups: [String] | [];
    initialStateStudents:  [StudentInterface] | [];
    
} 

//---------------------------------------
// ASSIGNING DEFAULT STATE TO RECOIL! 😍
const defaultState:StudentTypes = {
      students: [],
      Query: true,
      loading: false,
      enrolledStudents: 0,
      editGroups: [],
      initialStateStudents:[],
     
} 

//---------------------------------------
// EXPORTING RECOIL STATE 😍 
export const studentState = atom<StudentTypes>({
    key: 'StudentInterface',
    default: defaultState,
})
//---------------------------------------


