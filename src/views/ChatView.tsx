import Logo from '@atoms/Logo';
import SendIcon from '@atoms/SendIcon';
import MapIcon from '@atoms/MapIcon';
import Status from '@atoms/Status';
import { useUserSettings } from '@store/userSettings';
import { UserStatus } from '@utils/enums';
import { AnimatePresence, motion as m, MotionProps } from 'framer-motion';
import { useEffect, useState, useRef, useLayoutEffect, forwardRef, Ref } from 'react';
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
    messageId: number,
    setReaction?: Function | undefined
}

type ChatBubbleReactionProps = {
    selected: undefined | string,
    isOpen: boolean,
    onReactionSelected?: Function | undefined,
    onSelectedReactionClicked?: Function | undefined,
    reverse: boolean,
}

type ReactionProps = {
    id?: string,
    alwaysPlay?: boolean,
    onClick?: Function | undefined
}

enum BubbleType {
    OWN, PARTNER //0, 1
}

type InputContainerProps = {
    setChat: Function,
    typingState: [typing: boolean, setTyping: Function]
}

interface msg {
    message: string,
    reaction: undefined | string,
    from: number,
    id: number,
}

let chat: msg[] = [
    {
        message: 'Szia!',
        reaction: undefined,
        from: 1,
        id: 0,
    },
    {
        message: 'Szia!',
        reaction: undefined,
        from: 0,
        id: 1,
    },
    {
        message: 'Hogy vagy?',
        reaction: undefined,
        from: 1,
        id: 2,
    },
    {
        message: 'Mi jót csinálsz?',
        reaction: undefined,
        from: 1,
        id: 3,
    },
    {
        message: 'Jól vagyok köszönöm! \n Éppen zenét hallgatok és próbálok valami hosszút irni, hogy megnézzem milyen. :)',
        reaction: undefined,
        from: 0,
        id: 4,
    },
    {
        message: 'Szia!',
        reaction: undefined,
        from: 1,
        id: 5,
    },
    {
        message: 'Megmutatod? :D',
        reaction: 'cool',
        from: 1,
        id: 6,
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

    const setReactionOnChatMessage = (messageId: number, reaction: string | undefined) => {
        const newChatData: msg[] = chatData.filter(msg => msg.id !== messageId);
        const updatedMsg: msg | undefined = chatData.find(msg => msg.id === messageId);
        if (updatedMsg === undefined) return;

        setChatData([...newChatData, { ...updatedMsg, reaction: reaction }].sort((a: msg, b: msg) => a.id - b.id));

    }

    useEffect(() => {
        console.log(chatData);
    }, [chatData])


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
                        {chatData.map((message: msg) =>
                            <ChatBubble setReaction={setReactionOnChatMessage} messageId={message.id} key={message.id} text={message.message} type={message.from} reactionString={message.reaction} />
                        )}
                        {typing &&
                            <>
                                <ChatBubble key={-1} messageId={-1} className={'!w-fit !mb-1 !min-h-[48px]'} text={<TypingIndicator />} type={BubbleType.PARTNER} />
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

const ChatBubble = ({ text, type, className, reactionString, messageId, setReaction = undefined }: ChatBubbleProps) => {
    const [reactionMenu, setReactionMenu] = useState<boolean>(false);
    const bubbleRef = useRef<HTMLDivElement>(null);

    const userColor = useUserSettings(state => state.color);
    const bgColor = classNames({
        'bg-[#DBDBDB]': type === BubbleType.PARTNER,
        [`bg-${userColor}`]: type === BubbleType.OWN,
    });

    const bind = useLongPress(() => {
        if (type === BubbleType.OWN) return;

        setReactionMenu(true);
    });

    useEffect(() => {
        const listenClickOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target === bubbleRef.current || target.parentElement === bubbleRef.current) return;
            setReactionMenu(false);
        }
        if (reactionMenu === true) {
            document.addEventListener('click', listenClickOut);
        } else {
            document.removeEventListener('click', listenClickOut);
        }
    }, [reactionMenu]);

    return (
        <m.div className={`chat-bubble-wrapper ${bgColor} ${type === BubbleType.OWN ?
            'justify-end self-end text-white !rounded-br-none text-right bg-' : 'justify-start !rounded-bl-none'} 
${className}`} {...bind()} ref={bubbleRef}>
            <m.div layout> {text} </m.div>
            <ChatBubbleReaction
                selected={reactionString}
                isOpen={reactionMenu}
                onReactionSelected={(id: string) => setReaction?.(messageId, id)}
                onSelectedReactionClicked={() => setReaction?.(messageId, undefined)}
                reverse={type === BubbleType.OWN}
            />
        </m.div>
    )
}

const container = {
    hidden: {
        opacity: 0,
        scale: 0,
        transition: {
            staggerChildren: 0.1,
            when: "afterChildren"
        },
        transitionEnd: {
            display: 'none',
        }
    },
    show: {
        opacity: 1,
        scale: 1,
        display: 'flex',
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const listItem = {
    hidden: { scale: 0 },
    show: { scale: 1 }
};

const ChatBubbleReaction = ({
    selected,
    isOpen,
    onReactionSelected = undefined,
    onSelectedReactionClicked = undefined,
    reverse,
}: ChatBubbleReactionProps) => {
    const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>(selected);

    useEffect(() => {
        setSelectedEmoji(selected);
    }, [selected])

    return (
        <m.div className={`chat-bubble-reaction-wrapper ${reverse && 'reverse'}`}>
            <AnimatePresence>
                {selectedEmoji && <MotionReaction
                    id={selectedEmoji}
                    alwaysPlay={true}
                    onClick={() => onSelectedReactionClicked?.()}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                />}
            </AnimatePresence>
            <AnimatePresence>
                <m.div
                    className={'chat-bubble-reaction-list'}
                    initial="hidden"
                    animate={isOpen ? 'show' : 'hidden'}
                    variants={container}
                >
                    {EMOJIS.map(emoji => <MotionReaction
                        key={emoji.id}
                        id={emoji.id}
                        variants={listItem}
                        onClick={() => onReactionSelected?.(emoji.id)}
                    />)}
                </m.div>
            </AnimatePresence>
        </m.div>
    )
}

const Reaction = forwardRef(({ id, alwaysPlay = false, onClick = undefined }: ReactionProps, ref: Ref<any>): JSX.Element => {
    const [hover, setHover] = useState(false);
    const emojiById: EmojiInterface | undefined = EMOJIS.find(e => e.id === id);

    if (id === undefined || emojiById === undefined) return <></>;
    const sizeClass = classNames({
        [`w-${emojiById.size}`]: emojiById.size !== undefined,
        [`h-${emojiById.size}`]: emojiById.size !== undefined,
        'w-7 h-7': emojiById.size === undefined
    })
    return alwaysPlay ?
        <m.img ref={ref} className={`emoji active ${sizeClass}`} src={emojiById.gif} onClick={() => onClick?.()} />
        :
        <m.div
            className={`cursor-pointer grayscale hover:grayscale-0 emoji-container`}
            whileHover={{ scale: 1.5 }}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            onClick={() => onClick?.()}
            ref={ref}
        >
            <img
                style={{ opacity: hover ? 1 : 0 }}
                className={`emoji ${sizeClass}`}
                src={emojiById.gif}
            />
            <img
                style={{ opacity: hover ? 0 : 1 }}
                className={`emoji ${sizeClass}`}
                src={emojiById.img}
            />
        </m.div>;
});

const MotionReaction = m(Reaction);

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
        setChat((prev: msg[]) => [...prev, { message: content, reaction: '', from: 0, id: prev.length + 1 }]);
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
                <SendIcon size={25} className={`cursor-pointer fill-${userColor} `} />
            </m.button>
        ) : <></>}
    </m.div>)
}

export default ChatView