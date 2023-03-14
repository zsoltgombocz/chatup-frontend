import Logo from '@atoms/Logo';
import SendIcon from '@atoms/SendIcon';
import MapIcon from '@atoms/MapIcon';
import Status from '@atoms/Status';
import { useUserSettings } from '@store/userSettings';
import { UserStatus } from '@utils/enums';
import { AnimatePresence, motion as m } from 'framer-motion';
import { useEffect, useState, useRef, useLayoutEffect, ReactNode, ReactFragment } from 'react';
import TextArea from '@components/TextArea';
import TypingIndicator from '@atoms/TypingIndicator';
import InlineMenu from '@components/InlineMenu';
import { menuElementInterface } from '@utils/interfaces/menuElementInterface';
import { AdjustmentsHorizontalIcon, ArrowRightOnRectangleIcon, EyeIcon, EyeSlashIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import ChatOverlay from './chat/ChatOverlay';
import classNames from 'classnames';

import { useLongPress } from 'use-long-press';
import { EMOJIS } from '@config/emojis';
import { EmojiInterface } from '@utils/interfaces/emojiInterface';

type ChatBubbleProps = {
    text: any,
    type: BubbleType,
    className?: string,
    reactionString?: string
}

type ChatBubbleReactionProps = {
    selected: undefined | string,
    isOpen: boolean,
}

type ReactionProps = {
    gif?: JSX.Element,
    id?: string,
    alwaysPlay?: boolean
}

enum BubbleType {
    OWN, PARTNER //0, 1
}

type InputContainerProps = {
    setChat: Function,
    typingState: [typing: boolean, setTyping: Function]
}

const chat = [
    {
        message: 'Szia!',
        reaction: undefined,
        from: 1
    },
    {
        message: 'Szia!',
        reaction: undefined,
        from: 0
    },
    {
        message: 'Hogy vagy?',
        reaction: undefined,
        from: 1
    },
    {
        message: 'Mi jót csinálsz?',
        reaction: undefined,
        from: 1
    },
    {
        message: 'Jól vagyok köszönöm! \n Éppen zenét hallgatok és próbálok valami hosszút irni, hogy megnézzem milyen. :)',
        reaction: undefined,
        from: 0
    },
    {
        message: 'Szia!',
        reaction: undefined,
        from: 1
    },
    {
        message: 'Megmutatod? :D',
        reaction: undefined,
        from: 1
    },
];

const iconClass = 'w-8 h-8 text cursor-pointer';

const menuElements: menuElementInterface[] = [
    {
        icon: <EyeIcon className={iconClass} />,
        openIcon: <EyeSlashIcon className={iconClass} />,
        name: 'Partnered',
        onClick: undefined,
        order: 1,
    },
    {
        icon: <ShieldExclamationIcon className={`${iconClass} text-toast-red`} />,
        name: 'Jelentés',
        onClick: undefined,
        order: 3,
    },
    {
        icon: <AdjustmentsHorizontalIcon className={iconClass} />,
        name: 'Beállítások',
        onClick: undefined,
        order: 2,
    },
    {
        icon: <ArrowRightOnRectangleIcon className={iconClass} />,
        name: 'Kilépés',
        onClick: undefined,
        order: 4,
    }
];
const ChatView = () => {
    const chatAreaRef = useRef<HTMLDivElement>(null);

    const [typing, setTyping] = useState(false);
    const [chatData, setChatData] = useState(chat);

    const userColor = useUserSettings(state => state.color);

    useLayoutEffect(() => {
        const chatArea = chatAreaRef.current;
        if (!chatArea) return;

        chatArea.scrollTo({
            top: chatArea.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    });

    return (
        <div className={'bg-chat w-full h-full'}>
            <m.div className={'view !py-0 !px-0 !max-w-[800px] mx-auto !h-screen'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex-shrink flex flex-row justify-between p-5 h-[90px]'}>
                    <Logo size={'sm'} />
                    <m.div layout className={'flex flex-row justify-end items-center gap-1 relative flex-grow w-full'}>
                        <Status status={UserStatus.ONLINE} />

                        <InlineMenu menuElements={menuElements} />
                    </m.div>
                </div>

                <div className={'flex-grow h-fit flex overflow-hidden flex-col relative'}>
                    <m.div className={'chat-area scroll-smooth'} ref={chatAreaRef} layout>
                        {chatData.map(message =>
                            <ChatBubble text={message.message} type={message.from} reactionString={message.reaction} />
                        )}
                        {typing &&
                            <>
                                <ChatBubble className={'!w-fit !mb-1 !min-h-[48px]'} text={<TypingIndicator />} type={BubbleType.PARTNER} />
                                <p className={'mb-5 text text-xs !text-gray-300'}>A partnered gépel...</p>
                            </>}
                    </m.div>
                    <AnimatePresence>
                        <m.div layout className={'relative chat-footer pb-6'}>
                            <InputContainer setChat={setChatData} typingState={[typing, setTyping]} />
                        </m.div>
                    </AnimatePresence>
                </div>
            </m.div>
        </div>
    )
}

const ChatBubble = ({ text, type, className, reactionString }: ChatBubbleProps) => {
    const [reaction, setReaction] = useState<string | undefined>(reactionString);

    const userColor = useUserSettings(state => state.color);
    const bgColor = classNames({
        'bg-[#DBDBDB]': type === BubbleType.PARTNER,
        [`bg-${userColor}`]: type === BubbleType.OWN,
    });

    const bind = useLongPress(() => {
        const rand = Math.floor(Math.random() * (4 - 1) + 1);
        const emoji = Object.values(EMOJIS)[rand];
        setReaction(reaction === undefined ? emoji.id : undefined);
    });

    return (
        <m.div className={`chat-bubble-wrapper ${bgColor} ${type === BubbleType.OWN ?
            'self-end text-white !rounded-br-none text-right bg-' : 'self-start !rounded-bl-none'} 
${className}`} {...bind()}>
            <m.div layout> {text} </m.div>
            <ChatBubbleReaction selected={reactionString} isOpen={true} />
        </m.div>
    )
}

const ChatBubbleReaction = ({ selected, isOpen }: ChatBubbleReactionProps) => {
    const [reaction, setReaction] = useState<string | undefined>(selected);

    useEffect(() => {
        setReaction('cool');
    }, [])


    return (
        <m.div className={'chat-bubble-reaction-wrapper'}>
            <AnimatePresence>
                {reaction && <Reaction id={reaction} alwaysPlay={true} />}

                {isOpen && (
                    <m.div className={'chat-bubble-reaction-list'}>
                        {EMOJIS.map(emoji => <Reaction id={emoji.id} />)}
                    </m.div>
                )}
            </AnimatePresence>
        </m.div>
    )
}

const Reaction = ({ gif, id, alwaysPlay = false }: ReactionProps): JSX.Element => {
    const [hover, setHover] = useState(false);
    if (gif === undefined && id === undefined) return <></>;
    const emojiById: EmojiInterface | undefined = EMOJIS.find(e => e.id === id);

    const emoji: JSX.Element = id ? emojiById?.gif || <></> : gif || <></>;

    return alwaysPlay ?
        emoji
        :
        <m.div
            className={'cursor-pointer grayscale hover:grayscale-0'}
            whileHover={{ scale: 1.5 }}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
        >{hover ? emojiById?.gif : emojiById?.img}</m.div>;
}

const InputContainer = ({ setChat, typingState }: InputContainerProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [typing, setTyping] = typingState;
    const [textLength, setTextLength] = useState(0);
    //! TODO: GET PARTNER INPUT STATE AND REPLACE IT WITH TYPING, CAN BE MOVED UP TO PARENT
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea === null) return;
        let debounceTimeout: NodeJS.Timeout;

        const handleTextareaChange = () => {
            const textareaValue = textarea.value;
            if (textareaValue.length <= 0 && typing) setTyping(false);
            if (textareaValue.length <= 0) return;

            setTyping(true);
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                setTyping(false);
            }, 2000);

            setTextLength(textareaValue.length);
        };

        textarea.addEventListener('input', handleTextareaChange);
        textarea.addEventListener('keyup', (e) => setTextLength((e.target as HTMLTextAreaElement).value.length));
        return () => {
            textarea.removeEventListener('input', handleTextareaChange);
            clearTimeout(debounceTimeout);
        };
    }, [textareaRef]);

    const handleOnSend = (event: any, text?: string | undefined) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const content = text || textarea.value;
        if (!content) return;

        setChat((prev: any) => [...prev, { message: content, reaction: '', from: 0 }]);
        textarea.value = "";
        setTyping(false);
        setTextLength(0);
    }

    const userColor = useUserSettings(state => state.color);

    return (<m.div layoutRoot className={'input-container z-20'}>
        <TextArea placeholder='teszt' textareaRef={textareaRef} onSend={handleOnSend} />
        <m.button layout={'position'} className={'chat-more'}>
            <MapIcon size={25} className={'cursor-pointer dark:fill-white fill-gray-600'} />
        </m.button>

        {textLength > 0 ? (
            <m.button
                onClick={handleOnSend}
                className={'chat-send'}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, position: 'absolute' }}>
                <SendIcon size={25} className={`cursor - pointer fill - ${userColor} `} />
            </m.button>
        ) : <></>}
    </m.div>)
}

export default ChatView