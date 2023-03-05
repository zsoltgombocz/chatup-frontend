import Logo from '@atoms/Logo';
import SendIcon from '@atoms/SendIcon';
import MapIcon from '@atoms/MapIcon';
import Status from '@atoms/Status';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useUserSettings } from '@store/userSettings';
import { UserStatus } from '@utils/enums';
import { motion as m } from 'framer-motion';
import { useEffect, useState } from 'react';

type ChatBubbleProps = {
    text: string,
    color: string,
    type: BubbleType,
}

enum BubbleType {
    OWN, PARTNER
}

const ChatView = () => {
    useEffect(() => {
        console.log('id alapjan ujra csatlakozni socketre??')
    }, []);

    const userColor = useUserSettings(state => state.color);

    const [text, setText] = useState('');

    return (
        <>
            <m.div className={'view !py-0 !px-0 flex flex-col !max-w-[800px]'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex-shrink flex flex-row justify-between p-5'}>
                    <Logo size={'sm'} />
                    <div className={'flex flex-row justify-center items-center gap-1'}>
                        <Status status={UserStatus.ONLINE} />
                        <Bars3Icon className={'h-8 w-10 cursor-pointer text-black dark:text-white'} />
                    </div>
                </div>

                <div className={'chat-area'}>
                    <ChatBubble text={'Szia!'} color={'white'} type={BubbleType.PARTNER} />
                    <ChatBubble text={'Szia!'} color={userColor} type={BubbleType.OWN} />
                    <ChatBubble text={'Hogy vagy?'} color={'white'} type={BubbleType.PARTNER} />
                    <ChatBubble text={'Mi jót csinálsz?'} color={'white'} type={BubbleType.PARTNER} />
                    <ChatBubble text={'Jól vagyok köszönöm! \n Éppen zenét hallgatok és próbálok valami hosszút irni, hogy megnézzem milyen. :)'} color={userColor} type={BubbleType.OWN} />
                    <ChatBubble text={'Na szuper, de hamár van egy jópofa GIF küldő akkor melyik a kedvenc GIF-ed?'} color={'white'} type={BubbleType.PARTNER} />
                    <ChatBubble text={'Megmutatod? :D'} color={'white'} type={BubbleType.PARTNER} />
                    <ChatBubble text={'CSAK TESZT MIATT EKKORA A BUBOREKOK KOZOTTI MARGO JOOO??'} color={userColor} type={BubbleType.OWN} />
                </div>
                <div className={'relative chat-footer pb-6'}>
                    <p className={'text-xs text-center py-1'}>A partnered éppel gépel . . .</p>
                    <div className={'input-container'}>
                        <textarea rows={1} className={'chat-input'} onChange={(e) => setText(e.target.value)} />
                        <button className={'chat-more'}>
                            <MapIcon size={25} className={'cursor-pointer fill-white'} />
                        </button>
                        <button className={'chat-send'}>
                            {text.length > 0 && <SendIcon size={25} className={`cursor-pointer fill-${userColor}`} />}
                        </button>
                    </div>
                </div>

            </m.div>
        </>
    )
}

const ChatBubble = ({ text, color, type }: ChatBubbleProps) => {
    const bgColor = 'bg-' + color;

    return (<div className={`chat-bubble ${bgColor} ${type === BubbleType.OWN ? 'self-end text-white !rounded-br-none text-right' : 'self-start !rounded-bl-none'}`}>
        {text}
    </div>)
}

export default ChatView