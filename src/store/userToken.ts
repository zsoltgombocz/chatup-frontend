import { create } from 'zustand';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface userTokenInterface {
    token: string | undefined,
    setToken: (token: string) => void
}

const getTokenFromCookie = (): string | undefined => {
    return cookies.get('token');
}

export const useUserToken = create<userTokenInterface>((set, get) => ({
    token: getTokenFromCookie(),

    setToken: (token: string) => {
        cookies.set('token', token);
        set(state => ({ ...state, token }))
    },
}));