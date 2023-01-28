import { create } from 'zustand';
import { County } from '../utils/interfaces/map';
import { Gender } from '../utils/types';

interface SexPreferencesInterface {
    ownSex: Gender,
    partnerSex: Gender
    setOwnSex: (gender: Gender) => void,
    setPartnerSex: (gender: Gender) => void,
}

export const useSexPreferences = create<SexPreferencesInterface>((set, get) => ({
    ownSex: Gender.MALE,
    partnerSex: Gender.ALL,
    setOwnSex: (gender: Gender) => {
        set(state => ({ ...state, ownSex: gender }));
    },
    setPartnerSex: (gender: Gender) => {
        set(state => ({ ...state, partnerSex: gender }));
    }
}));