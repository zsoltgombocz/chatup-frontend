export interface achievementInterface {
    id: string,
    title: string,
    description: string,
    sound?: string
}

interface achievementConfigInterface {
    achievements: achievementInterface[],
}

export const config: achievementConfigInterface = {
    achievements: [
        {
            id: 'dua_lipa',
            title: 'Dua Lipa itt?',
            description: 'Gratulálunk! Megtaláltad az első elérhető eredményt. Élvezd ki a különleges témádat mert nem sokan dicsekedhetnek el vele.',
            sound: 'dua_lipa.mp3'
        },
        {
            id: 'enthusiastic_chatter',
            title: 'Lelkes csevegő!',
            description: 'Ne hagyd abba! Hamarosan lemerülsz de te mégis a társaságot választod, gratulálunk!',
        }
    ]
}