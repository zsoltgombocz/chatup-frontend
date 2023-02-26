import gaming from '../media/images/gaming.webp';
import sport from '../media/images/sport.webp';
import love from '../media/images/love.webp';
import studies from '../media/images/studies.webp';
import animals from '../media/images/animals.webp';
import cars from '../media/images/cars.webp';
import photo from '../media/images/photo.webp';
import party from '../media/images/party.webp';
import computer from '../media/images/computer.webp';
import nature from '../media/images/nature.webp';
import music from '../media/images/music.webp';
import travel from '../media/images/travel.webp';
import art from '../media/images/art.webp';
import languages from '../media/images/languages.webp';
import read from '../media/images/read.webp';
import friends from '../media/images/friends.webp';
import lmbtq from '../media/images/lmbtq.webp';
import series from '../media/images/series.webp';
import dualipa from '../media/images/dua_lipa.webp';

import { InterestInterface } from "../utils/interfaces/interestInterface";

interface InterestConfigInterface {
    interests: InterestInterface[],
}

export const config: InterestConfigInterface = {
    interests: [
        {
            id: 'gaming',
            display: 'Gaming',
            src: gaming
        },
        {
            id: 'sport',
            display: 'Sport',
            src: sport
        },
        {
            id: 'love',
            display: 'Szerelem',
            src: love
        },
        {
            id: 'studies',
            display: 'Tanulmányok',
            src: studies
        },
        {
            id: 'animals',
            display: 'Állatok',
            src: animals
        },
        {
            id: 'cars',
            display: 'Gépjárművek',
            src: cars
        },
        {
            id: 'photo',
            display: 'Fotózás',
            src: photo
        },
        {
            id: 'fun',
            display: 'Szórakozás',
            src: party
        },
        {
            id: 'it',
            display: 'IT',
            src: computer
        },
        {
            id: 'nature',
            display: 'Természet',
            src: nature
        },
        {
            id: 'music',
            display: 'Zene',
            src: music
        },
        {
            id: 'travel',
            display: 'Utazás',
            src: travel
        },
        {
            id: 'art',
            display: 'Művészetek',
            src: art
        },
        {
            id: 'languages',
            display: 'Nyelvek',
            src: languages
        },
        {
            id: 'read',
            display: 'Olvasás',
            src: read
        },
        {
            id: 'friends',
            display: 'Barátok',
            src: friends
        },
        {
            id: 'lmbtq',
            display: 'LMBTQ',
            src: lmbtq
        },
        {
            id: 'series',
            display: 'Sorozat',
            src: series
        },
        {
            id: 'dua_lipa',
            display: 'Dua Lipa',
            src: dualipa
        }
    ]
}