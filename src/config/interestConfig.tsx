import interests from "@media/interests";
import { InterestInterface } from "@utils/interfaces/interestInterface";

interface InterestConfigInterface {
    interests: InterestInterface[],
}

export const config: InterestConfigInterface = {
    interests: [
        {
            id: 'gaming',
            display: 'Gaming',
            src: interests.gaming
        },
        {
            id: 'sport',
            display: 'Sport',
            src: interests.sport
        },
        {
            id: 'love',
            display: 'Szerelem',
            src: interests.love
        },
        {
            id: 'studies',
            display: 'Tanulmányok',
            src: interests.studies
        },
        {
            id: 'animals',
            display: 'Állatok',
            src: interests.animals
        },
        {
            id: 'cars',
            display: 'Gépjárművek',
            src: interests.cars
        },
        {
            id: 'photo',
            display: 'Fotózás',
            src: interests.photo
        },
        {
            id: 'fun',
            display: 'Szórakozás',
            src: interests.party
        },
        {
            id: 'it',
            display: 'IT',
            src: interests.computer
        },
        {
            id: 'nature',
            display: 'Természet',
            src: interests.nature
        },
        {
            id: 'music',
            display: 'Zene',
            src: interests.music
        },
        {
            id: 'travel',
            display: 'Utazás',
            src: interests.travel
        },
        {
            id: 'art',
            display: 'Művészetek',
            src: interests.art
        },
        {
            id: 'languages',
            display: 'Nyelvek',
            src: interests.languages
        },
        {
            id: 'read',
            display: 'Olvasás',
            src: interests.read
        },
        {
            id: 'friends',
            display: 'Barátok',
            src: interests.friends
        },
        {
            id: 'lmbtq',
            display: 'LMBTQ',
            src: interests.lmbtq
        },
        {
            id: 'series',
            display: 'Sorozat',
            src: interests.series
        },
        {
            id: 'dua_lipa',
            display: 'Dua Lipa',
            src: interests.dualipa
        }
    ]
}