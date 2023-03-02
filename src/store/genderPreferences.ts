import { create } from 'zustand';
import { Gender } from '@utils/enums';
interface GenderPreferencesInterface {
    ownGender: Gender,
    partnerGender: Gender
    setOwnGender: (gender: Gender) => void,
    setPartnerGender: (gender: Gender) => void,
}

const getSavedGender = (which: 'own' | 'partner') => {
    const savedData = sessionStorage.getItem(`chatup_${which}_gender`);
    const fallbackReturnGender = which === 'own' ? Gender.MALE : Gender.ALL;
    return savedData === null ? fallbackReturnGender : (parseInt(savedData) || fallbackReturnGender);
}

export const useGenderPreferebces = create<GenderPreferencesInterface>((set, get) => ({
    ownGender: getSavedGender('own'),
    partnerGender: getSavedGender('partner'),
    setOwnGender: (gender: Gender) => {
        set(state => ({ ...state, ownGender: gender }));
        sessionStorage.setItem('chatup_own_gender', '' + gender);
    },
    setPartnerGender: (gender: Gender) => {
        set(state => ({ ...state, partnerGender: gender }));
        sessionStorage.setItem('chatup_partner_gender', '' + gender);
    }
}));