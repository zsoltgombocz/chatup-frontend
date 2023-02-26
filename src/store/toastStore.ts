import { create } from 'zustand';

interface toastStoreInterface {
    visible: boolean,
    text: string,
    title: string,
    hideAfter?: number | undefined,
    icon?: string | undefined,
    show: (text: string, title: string, hideAfter?: number) => void,
    hide: () => void,
}

export const useToastStore = create<toastStoreInterface>((set, get) => ({
    visible: false,
    text: '',
    title: '',
    icon: undefined,
    hideAfter: undefined,
    show: (title: string, text: string, hideAfter?: number, icon?: string | undefined) => {
        set(state => ({ ...state, visible: true, text, title, hideAfter, icon }));
    },
    hide: () => {
        set(state => ({ ...state, visible: false }));
    }
}));