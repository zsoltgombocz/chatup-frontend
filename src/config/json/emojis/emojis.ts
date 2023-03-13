import lol from './lol.json';
import gloomy from './gloomy.json';
import excited from './excited.json';
import cool from './cool.json';
import angry from './angry.json';
import love from './love.json';
import { EmojiInterface } from '@utils/interfaces/emojiInterface';

export const getEmojiJSON = (id: string): EmojiInterface | undefined => {
    return EMOJIS.find(e => e.id === id)?.emojiJSON;
}

export const EMOJIS: EmojiInterface[] = [
    {
        id: 'angry',
        emojiJSON: angry
    },
    {
        id: 'cool',
        emojiJSON: cool
    },
    {
        id: 'excited',
        emojiJSON: excited
    },
    {
        id: 'gloomy',
        emojiJSON: gloomy
    },
    {
        id: 'lol',
        emojiJSON: lol
    },
    {
        id: 'love',
        emojiJSON: love
    },
];