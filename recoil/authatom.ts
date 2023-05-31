
import {atom} from 'recoil';

// INTERFACE FOR OUR AUTH MODAL!
export interface AuthAtom {
    view: 'login' | 'register' | 'reset';
    open: boolean
}


// DEFAULT STATE
const defaultState:AuthAtom = {
    view: 'login',
    open: false,
}


// CREATING STORE ATOM WITH RECOIL
export const AuthState = atom<AuthAtom>({
    key: 'authState123456',
    default: defaultState
}) 

