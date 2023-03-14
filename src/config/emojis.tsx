import { EmojiInterface } from "@utils/interfaces/emojiInterface";
import cool from '@media/emojis/cool.gif';
import coolImage from '@media/emojis/cool.png';

export const EMOJIS: EmojiInterface[] = [
    {
        id: "cool",
        gif: (<img className={'emoji'} src={cool} loading={"lazy"} />),
        img: (<img className={'emoji'} src={coolImage} loading={"lazy"} />),
    }
]