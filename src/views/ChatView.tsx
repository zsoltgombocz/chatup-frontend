import Logo from '@atoms/Logo';
import SendIcon from '@atoms/SendIcon';
import MapIcon from '@atoms/MapIcon';
import Status from '@atoms/Status';
import { useUserSettings } from '@store/userSettings';
import { Gender, SearchState, UserStatus } from '@utils/enums';
import { AnimatePresence, motion as m } from 'framer-motion';
import { useEffect, useState, useRef, useLayoutEffect, forwardRef, Ref, RefObject, SyntheticEvent } from 'react';
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
import { counties } from '@config/mapConfig';
import { config as interestConfig } from '@config/interestConfig';
import ImageCircle from '@atoms/ImageCircle';
import VerticalDivider from '@atoms/VerticalDivider';
import { config as achievementsConfig } from '@config/achievementConfig';

import interests from '@media/interests';

import { useDraggable } from "react-use-draggable-scroll";
import { useSocketStore } from '@store/socketStore';
import { useNavigate } from 'react-router-dom';
import { connectToSocket, socket } from '../socket';
import { useUserData } from '@/store/userData';

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

type ChatExtensionProps = {
    showAchievements: boolean,
    showPartnerInfo: boolean
}

interface AchievementInterface {
    image: string | undefined,
    title: string,
    className?: string,
    isOpen: boolean,
    onClick: Function | undefined,
    id: string,
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

const ChatView = () => {
    const chatAreaRef = useRef<HTMLDivElement>(null);

    const [typing, setTyping] = useState(false);
    const [chatData, setChatData] = useState(chat);
    const [partnerInfo, setPartnerInfo] = useState<boolean>(false);
    const [lastMessageId, setLastMessageId] = useState<number>(chat[chat.length - 1].id);
    const [isChatValidated, setIsChatValidated] = useState<boolean | null>(null);

    const showAchvSetting = useUserSettings(state => state.showAchievements)

    const { roomId, token, setSearch } = useUserData();

    const navigate = useNavigate();

    const validateChat = () => {
        console.log(roomId, token);


        socket.emit('validateChat', { roomId, token }, (response: { status: boolean }) => {
            setIsChatValidated(response.status);
        })
    }

    const iconClass = 'w-8 h-8 text cursor-pointer';
    const menuElements: menuElementInterface[] = [
        {
            icon: <EyeIcon className={iconClass} />,
            openIcon: <EyeSlashIcon className={iconClass} />,
            name: 'Partnered',
            onClick: () => setPartnerInfo(prev => !prev),
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

    useEffect(() => {
        return () => {
            socket.emit('leavedChat');
        }
    }, []);

    useEffect(() => {
        if (isChatValidated === null && roomId) {
            validateChat();
        }

        if (roomId === null || roomId === undefined || isChatValidated === false) {
            setSearch(SearchState.ACTIVE);
            navigate('/search');
        }
    }, [roomId, isChatValidated]);


    useLayoutEffect(() => {
        const chatArea = chatAreaRef.current;
        if (!chatArea || (!typing && lastMessageId === chatData[chatData.length - 1].id)) return;

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

    return isChatValidated ? (
        <div className={'bg-chat w-full h-full'}>
            <m.div style={{ height: 'inherit' }} className={'view !py-0 !px-0 !max-w-[800px] mx-auto'} initial={{ x: -500 }} animate={{ x: 0 }} exit={{ x: -500 }}>
                <div className={'flex-shrink flex flex-row justify-between p-5 h-[90px]'}>
                    <Logo size={'sm'} />

                    <div className={'flex flex-row justify-end items-center gap-1 relative flex-grow w-full'}>
                        <Status status={UserStatus.ONLINE} />

                        <InlineMenu menuElements={menuElements} />
                    </div>
                </div>

                <div className={'flex-grow h-fit flex overflow-hidden flex-col relative'}>
                    <ChatExtension showAchievements={showAchvSetting} showPartnerInfo={partnerInfo} />
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
    ) : <>akar loader</>
}
const PartnerInfo = () => {
    const GENDER = Gender.MALE;
    const LOCATION: string = 'pest';
    const countyName = counties.find(county => county.id === LOCATION)?.name || 'Hiányzó';

    const INTERESTS = ['lmbtq', 'music', 'dua_lipa'].map(interestId => {
        return interestConfig.interests.find(int => int.id === interestId);
    }).filter(interest => interest !== undefined);

    return (<div className={'text p-2 flex flex-col sm:flex-row justify-center items-center sm:gap-7'}>
        <div className={'mr-5 hidden sm:block'}>{GENDER === Gender.MALE ? 'Férfi' : 'Nő'}</div>
        <VerticalDivider className={'hidden sm:block'} />
        <div className={'flex flex-row gap-2 justify-center items-center'}>
            {INTERESTS.map(interest =>
                <ImageCircle src={interest!.src} hasBorder={true} noColor={true} />
            )}
        </div>
        <VerticalDivider className={'hidden sm:block'} />
        <div className={'ml-5 hidden sm:block'}>{countyName}</div>
        <div className={'sm:hidden flex flex-row justify-center items-center w-full mt-2'}>
            <div className={'mr-5'}>{GENDER === Gender.MALE ? 'Férfi' : 'Nő'}</div>
            <VerticalDivider className={'!h-6 !w-[3px]'} />
            <div className={'ml-5'}>{countyName}</div>

        </div>
    </div>);
}

const AchievementsShowcase = () => {
    const [achievements, setAchievements] = useState(
        achievementsConfig.achievements.map(achievement => {
            return { ...achievement, isOpen: false };
        })
    );
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref);

    const blurLeft = 'bg-gradient-to-r from-bg-light-outer dark:from-bg-dark-inner from-25%'
    const blurRight = 'bg-gradient-to-l from-bg-light-outer dark:from-bg-dark-inner from-25%'

    const onAchievementClick = (id: string) => {
        const achs = achievements.map(achievement => {
            return { ...achievement, isOpen: achievement.id === id ? !achievement.isOpen : false };
        });
        setAchievements(achs);
    }

    return (
        <div
            className={`
                w-full max-w-[500px] h-fit select-none mx-auto justify-center items-center relative pb-2
            `}
        >
            <div className={`blur-left ${blurLeft}`}></div>
            <div className={`blur-right ${blurRight}`}></div>
            <m.div
                className={'h-20 flex overflow-x-auto scrollbar-hide overflow-y-hidden scrollbar-hidden'}
                {...events}
                ref={ref}
                layoutRoot
            >
                {
                    achievements.map((ach, index) => (
                        <Achievement key={index} id={ach.id} image={ach.image} title={ach.title} className={`
                        inline-flex justify-center items-center pr-6
                        ${index === 0 ? 'pl-[20px]' : ''}
                        ${index === achievements.length - 1 ? 'pr-4' : ''}
                    `} isOpen={ach.isOpen} onClick={() => onAchievementClick(ach.id)} />
                    ))
                }
            </m.div>
            <ShowcaseScrollBar div={ref} className={'mt-2'} />
        </div >
    )
}

const ShowcaseScrollBar = ({ div, className }: { div: RefObject<HTMLDivElement>, className: string | undefined }) => {
    const [currentScroll, setCurrentScroll] = useState<number>(0);
    const userColor = useUserSettings(state => state.color);

    useEffect(() => {
        if (div === null || div === undefined) return;

        const handleDivScroll = (e: Event) => {
            const target = e.target as HTMLDivElement;
            const scrollMax = (target.scrollWidth - target.clientWidth);
            const ratio = scrollMax / (75 - 16);
            setCurrentScroll(target.scrollLeft / ratio);
        }
        div.current?.addEventListener('scroll', handleDivScroll);

        return () => div.current?.removeEventListener('scroll', handleDivScroll);
    }, [div])

    return (
        <m.div layoutRoot className={`mx-auto flex flex-row items-center w-[75px] h-2 bg-[#DBDBDB] rounded ${className}`}>
            <m.div className={`w-4 bg-${userColor} h-2 rounded`} animate={{ x: currentScroll }}></m.div>
        </m.div>
    )
}

const AnimatedVerticalDivider = m(VerticalDivider);
const Achievement = ({ image, title, className, isOpen, onClick }: AchievementInterface) => {

    return (
        <m.div layout={'position'} className={`chat-achievement ${className}`} onClick={() => onClick?.()}>

            <ImageCircle src={image || interests.animals} hasBorder={true} size={'small'} noColor={isOpen} />
            {isOpen && (
                <AnimatePresence>
                    <AnimatedVerticalDivider
                        className={'mx-3'}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                    />
                    <m.div initial={{ x: -20 }} animate={{ x: 0 }} exit={{ x: -20 }} className={'text w-[85px]'}>
                        {title}
                    </m.div>
                </AnimatePresence>
            )}

        </m.div>
    )
}

const ChatExtension = ({ showAchievements, showPartnerInfo }: ChatExtensionProps) => {
    if (showPartnerInfo) return <PartnerInfo />;

    return showAchievements ? <AchievementsShowcase /> : <></>;
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
        <div className={`chat-bubble-wrapper ${bgColor} ${type === BubbleType.OWN ?
            'justify-end self-end text-white !rounded-br-none text-right bg-' : 'justify-start !rounded-bl-none'} 
${className}`} {...bind()} ref={bubbleRef}>
            <div> {text} </div>
            <ChatBubbleReaction
                selected={reactionString}
                isOpen={reactionMenu}
                onReactionSelected={(id: string) => setReaction?.(messageId, id)}
                onSelectedReactionClicked={() => setReaction?.(messageId, undefined)}
                reverse={type === BubbleType.OWN}
            />
        </div>
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