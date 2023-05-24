
import { atom} from 'recoil';
import React from 'react';
import {StudentInterface} from '@/models/Student';

// INTERFCAE
export interface PagenatedItems {
    paginatedData: StudentInterface[]|[];
    currentPage:number;
    numberOfButtons: React.ReactNode,
    loadingState: Boolean;
    buttonsDisplayer:number[];
    perPageList:number;
    firstIndex:number;
    lastIndex:number;
    checked: Boolean;
}

// DEFAULT STATE!
const defaultState:PagenatedItems = {
    paginatedData: [],
    currentPage: 1,
    numberOfButtons: 1,
    loadingState:false,
    buttonsDisplayer:[1],
    perPageList:5,
    firstIndex:0,
    lastIndex:4,
    checked: false,
}

// CREATING ATOM STATE!
export const PaginationAtom = atom<PagenatedItems>({
  key: 'currentPage',
  default: defaultState,
});
