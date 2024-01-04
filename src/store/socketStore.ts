import { UserStatus } from '@utils/enums';
import { create } from 'zustand';

interface SocketStoreInterface {
    connected: boolean;
    connectedUsers: number;
    queuePopulation: number;
    roomId: roomIdInterface;
    partnerFound: boolean;
    partnerStatus: UserStatus | undefined;
    partnerData: any;
    messages: any;
    setConnectedUsers: (num: number) => void;
    setConnected: (connectionState: boolean) => void;
    setQueuePopulation: (num: number) => void;
    setRoom: (roomId: roomIdInterface) => void;
    setPartnerFound: (b: boolean) => void;
    setPartnerStatus: (status: UserStatus) => void;
    setPartnerData: (data: any) => void;
    setMessages: (data: any) => void;
}

interface roomIdInterface {
    current: string | null,
    last: string | null
}

export const useSocketStore = create<SocketStoreInterface>((set, get) => ({
    connected: false,
    connectedUsers: 0,
    queuePopulation: 0,
    roomId: {
        current: null,
        last: null
    },
    partnerFound: false,
    partnerStatus: undefined,
    partnerData: {},
    messages: [],

    setConnectedUsers: (num: number) => {
        set(state => ({ ...state, connectedUsers: num }))
    },
    setConnected: (connectionState: boolean) => {
        set(state => ({ ...state, connected: connectionState }))
    },
    setQueuePopulation: (num: number) => {
        set(state => ({ ...state, queuePopulation: num }))
    },
    setRoom: (roomId: roomIdInterface) => {
        set(state => ({ ...state, roomId }))
    },
    setPartnerFound: (b: boolean) => {
        set(state => ({ ...state, partnerFound: b }));
    },
    setPartnerStatus: (status: UserStatus) => {
        set(state => ({ ...state, partnerStatus: status }));
    },
    setPartnerData: (data: any) => {
        set(state => ({ ...state, partnerData: data }));
    },
    setMessages: (data: any) => {
        console.log(data);
        set(state => ({ ...state, messages: data }));
    }
}));