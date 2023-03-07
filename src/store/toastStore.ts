import { ToastVariant } from '@utils/enums';
import { create } from 'zustand';

interface toastStoreInterface {
    visible: boolean,
    text: string,
    title: string,
    hideAfter?: number | undefined,
    icon?: string | undefined,
    type: ToastVariant,
    show: (text: string, title: string, type?: ToastVariant, hideAfter?: number) => void,
    hide: () => void,
}

export const useToastStore = create<toastStoreInterface>((set, get) => ({
    visible: false,
    text: '',
    title: '',
    icon: undefined,
    hideAfter: undefined,
    type: ToastVariant.DEFAULT,
    show: (title: string, text: string, type?: ToastVariant, hideAfter?: number, icon?: string | undefined) => {
        set(state => ({ ...state, visible: true, text, title, hideAfter, icon, type }));
    },
    hide: () => {
        set(state => ({ ...state, visible: false }));
    }
}));