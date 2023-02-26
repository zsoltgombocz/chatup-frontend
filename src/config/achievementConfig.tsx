export interface achievementInterface {
    id: string,
    title: string,
    description: string,
}

interface achievementConfigInterface {
    achievements: achievementInterface[],
}

export const config: achievementConfigInterface = {
    achievements: [
        {
            id: 'dua_lipa',
            title: 'Dua Lipa itt?',
            description: 'Gratulálunk! Megtaláltad az első elérhető eredményt. Élvezd ki a különleges témádat mert nem sokan dicsekedhetnek el vele.'
        }
    ]
}