import Logo from '@atoms/Logo';
import SendIcon from '@atoms/SendIcon';
import MapIcon from '@atoms/MapIcon';
import Status from '@atoms/Status';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useUserSettings } from '@store/userSettings';
import { UserStatus } from '@utils/enums';
import { AnimatePresence, motion as m } from 'framer-motion';
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

    const [text, setText] = useState("");
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (text.length <= 0 && typing) setTyping(false);
        if (text.length <= 0) return;

        setTyping(true);
        const debounce = setTimeout(() => {
            setTyping(false);
        }, 2000)

        return () => clearTimeout(debounce)
    }, [text])

    const userColor = useUserSettings(state => state.color);


    return (
        <>
            <m.div className={'view !py-0 !px-0 flex flex-col !max-w-[800px]'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex-shrink flex flex-row justify-between p-5'}>
                    <Logo size={'sm'} />
                    <div className={'flex flex-row justify-center items-center gap-1'}>
                        <Status status={UserStatus.ONLINE} />
                        <Bars3Icon className={'h-8 w-10 cursor-pointer text-gray-600 dark:text-white'} />
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
                <AnimatePresence>
                    <m.div layout className={'relative chat-footer pb-6'}>
                        <p
                            className={'text-xs text-center h-5 relative z-10'}
                        >
                            <AnimatePresence>
                                {typing && (
                                    <m.div
                                        className={'absolute top-0 w-full'}
                                        initial={{ opacity: 0, y: 25 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 25 }}
                                    >Partnered éppen gépel...</m.div>
                                )}
                            </AnimatePresence>
                        </p>

                        <m.div layout className={'input-container z-20'}>
                            <m.textarea layout placeholder={'Üzenet küldése...'} rows={1} className={'chat-input'} onChange={(e) => setText(e.target.value)} />
                            <m.button layout={'position'} className={'chat-more'}>
                                <MapIcon size={25} className={'cursor-pointer dark:fill-white fill-gray-600'} />
                            </m.button>

                            {text.length > 0 && (
                                <m.button
                                    className={'chat-send'}
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, position: 'absolute' }}>
                                    <SendIcon size={25} className={`cursor-pointer fill-${userColor}`} />
                                </m.button>
                            )}
                        </m.div>
                    </m.div>
                </AnimatePresence>
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