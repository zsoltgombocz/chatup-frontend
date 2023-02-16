import { create } from 'zustand';
import Cookies from 'universal-cookie';
import { CountyInterface } from '../utils/interfaces/map';

const cookies = new Cookies();

interface userData {
    token: string | undefined,
    location: CountyInterface | null | undefined,
    setToken: (token: string) => void
    setUserLocation: (location: CountyInterface | null) => void,
}

const getTokenFromCookie = (): string | undefined => {
    return cookies.get('token');
}

export const useUserData = create<userData>((set, get) => ({
    token: getTokenFromCookie(),
    location: undefined,
    setUserLocation: (location: CountyInterface | null) => {
        set(state => ({ ...state, location }))
    },
    setToken: (token: string) => {
        cookies.set('token', token);
        set(state => ({ ...state, token }))
    },
}));