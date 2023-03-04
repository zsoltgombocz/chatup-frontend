import Logo from '@atoms/Logo';
import Status from '@atoms/Status';
import { Bars3Icon, MapIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useUserSettings } from '@store/userSettings';
import { UserStatus } from '@utils/enums';
import { motion as m } from 'framer-motion';
import { useEffect } from 'react';

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

    return (
        <>
            <m.div className={'view !py-0 !px-0 flex flex-col'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex-shrink py-5 flex flex-row justify-between px-10'}>
                    <Logo size={'sm'} />
                    <div className={'flex flex-row justify-center items-center gap-1'}>
                        <Status status={UserStatus.ONLINE} />
                        <Bars3Icon className={'h-8 w-10 cursor-pointer text-black dark:text-white'} />
                    </div>
                </div>
                <div className={'bg-[#CCCCCC] w-full flex flex-grow flex-col rounded-t-xl'}>
                    <div className={'chat-area'}>
                        <ChatBubble text={'Szia!'} color={'white'} type={BubbleType.PARTNER} />
                        <ChatBubble text={'Szia!'} color={userColor} type={BubbleType.OWN} />
                        <ChatBubble text={'Hogy vagy?'} color={'white'} type={BubbleType.PARTNER} />
                        <ChatBubble text={'Mi jót csinálsz?'} color={'white'} type={BubbleType.PARTNER} />
                        <ChatBubble text={'Jól vagyok köszönöm! \n Éppen zenét hallgatok és próbálok valami hosszút irni, hogy megnézzem milyen. :)'} color={userColor} type={BubbleType.OWN} />
                        <ChatBubble text={'Na szuper, de hamár van egy jópofa GIF küldő akkor melyik a kedvenc GIF-ed?'} color={'white'} type={BubbleType.PARTNER} />
                        <ChatBubble text={'Megmutatod? :D'} color={'white'} type={BubbleType.PARTNER} />
                    </div>
                    <div className={'relative chat-footer pb-5 px-5'}>
                        <p className={'text-xs text-center py-1'}>A partnered éppel gépel . . .</p>
                        <div className={'input-container'}>
                            <input placeholder={'Üzenet küldése . . .'} type={'text'} className={'text chat-input'} />
                            <button className={'chat-more'}>
                                <MapIcon className={'w-7 h-7 cursor-pointer text-black dark:text-white'} />
                            </button>
                            <button className={'chat-send'}>
                                <PaperAirplaneIcon className={'w-7 h-7 cursor-pointer text-black dark:text-white'} />
                            </button>
                        </div>
                    </div>
                </div>
            </m.div>
        </>
    )
}

const ChatBubble = ({ text, color, type }: ChatBubbleProps) => {
    const bgColor = 'bg-' + color;

    return (<div className={`chat-bubble ${bgColor} ${type === BubbleType.OWN ? 'self-start text-white' : 'self-end'}`}>
        {text}
    </div>)
}

export default ChatView