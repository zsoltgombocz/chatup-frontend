export interface achievementInterface {
    id: string,
    title: string,
    description: string,
    image?: string
}

interface achievementConfigInterface {
    achievements: achievementInterface[],
}

export const config: achievementConfigInterface = {
    achievements: [
        {
            id: 'night_owl',
            title: 'Éjjeli bagoly!',
            description: 'Légy egy beszélgetésben 0:00-kor!',
        },
        {
            id: 'one_hour',
            title: 'Elszálló idő!',
            description: 'Beszélgess legalább egy órán át egy partnerrel.',
        },
        {
            id: 'gif_master',
            title: 'GIF mágus!',
            description: 'Küldj legalább 10 GIF-et egy beszélgetésen belül.',
        },
        {
            id: 'emote_user',
            title: 'Emocionális!',
            description: 'Reagálj legalább 10 üzenetre egy beszélgetésen belül.',
        },
        {
            id: 'research_try',
            title: 'Majd a következő!',
            description: 'Keress legalább 5 alkalommal új partnert!',
        },
        {
            id: 'feedback_user',
            title: 'Supportive!',
            description: 'Küldj egy értékelést!',
        },
        {
            id: 'topic_user',
            title: 'Téma bedobva!',
            description: 'Küldj legalább egy témát egy beszélgetésen belül!',
        },
        {
            id: 'easter_egg',
            title: 'Aranytojás!',
            description: 'Gyűjtsd össze a fellelhető összes Easter Egg-et!',
        }
    ]
}