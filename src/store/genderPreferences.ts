import { create } from 'zustand';
import { Gender } from '../utils/types';

interface GenderPreferencesInterface {
    ownGender: Gender,
    partnerGender: Gender
    setOwnGender: (gender: Gender) => void,
    setPartnerGender: (gender: Gender) => void,
}

export const useGenderPreferebces = create<GenderPreferencesInterface>((set, get) => ({
    ownGender: Gender.MALE,
    partnerGender: Gender.ALL,
    setOwnGender: (gender: Gender) => {
        set(state => ({ ...state, ownGender: gender }));
    },
    setPartnerGender: (gender: Gender) => {
        set(state => ({ ...state, partnerGender: gender }));
    }
}));