

import {atom} from 'recoil';
import {StudentInterface} from '@/models/Student';

// CREATING INTERFACE! 😍
export interface StudentTypes {
    students: [StudentInterface] | [];
    Query: Boolean;
    loading: Boolean;
    enrolledStudents: React.ReactNode;
    editGroups: [String] | [];
    initialStateStudents:  [StudentInterface] | [];
    filterGroups: [string]| []
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
      filterGroups: [],
     
} 

//---------------------------------------
// EXPORTING RECOIL STATE 😍 
export const studentState = atom<StudentTypes>({
    key: 'StudentInterface',
    default: defaultState,
})
//---------------------------------------


