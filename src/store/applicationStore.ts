import { create } from 'zustand';

interface applicationStoreInterface {
    firstLoad: boolean,
    setFirstLoadTo: (b: boolean) => void,
}

export const useApplicationStore = create<applicationStoreInterface>((set, get) => ({
    firstLoad: true,

    setFirstLoadTo: (b: boolean) => {
        set(state => ({ firstLoad: b }));
    }
}));