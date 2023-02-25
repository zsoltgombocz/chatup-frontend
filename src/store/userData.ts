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
    const savedToken: string | null = sessionStorage.getItem('token')
    return savedToken === null ? undefined : savedToken;
}

export const useUserData = create<userData>((set, get) => ({
    token: getTokenFromCookie(),
    location: undefined,
    setUserLocation: (location: CountyInterface | null) => {
        set(state => ({ ...state, location }))
        console.log(get());
    },
    setToken: (token: string) => {
        sessionStorage.setItem('token', token);
        set(state => ({ ...state, token }))
    },
}));