import { EmojiInterface } from "@utils/interfaces/emojiInterface";
import angryGif from '@media/emojis/angry.gif';
import angryImage from '@media/emojis/angry.png';
import coolGif from '@media/emojis/cool.gif';
import coolImage from '@media/emojis/cool.png';
import gloomyGif from '@media/emojis/gloomy.gif';
import gloomyImage from '@media/emojis/gloomy.png';
import glowGif from '@media/emojis/glow.gif';
import glowImage from '@media/emojis/glow.png';
import hypoGif from '@media/emojis/hypno.gif';
import hypoImage from '@media/emojis/hypno.png';
import loveGif from '@media/emojis/love.gif';
import loveImage from '@media/emojis/love.png';

export const EMOJIS: EmojiInterface[] = [
    {
        id: "angry",
        gif: angryGif,
        img: angryImage,
        size: 8
    },
    {
        id: "cool",
        gif: coolGif,
        img: coolImage,
    },
    {
        id: "gloomy",
        gif: gloomyGif,
        img: gloomyImage,
    },
    {
        id: "glow",
        gif: glowGif,
        img: glowImage,
    },
    {
        id: "hypo",
        gif: hypoGif,
        img: hypoImage,
    },
    {
        id: "love",
        gif: loveGif,
        img: loveImage,
    }
]