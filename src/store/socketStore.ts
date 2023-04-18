import { create } from 'zustand';

interface SocketStoreInterface {
    connected: boolean;
    connectedUsers: number;
    queuePopulation: number;
    roomId: string | null;
    partnerFound: boolean;
    setConnectedUsers: (num: number) => void;
    setConnected: (connectionState: boolean) => void;
    setQueuePopulation: (num: number) => void;
    setRoom: (roomId: string | null) => void;
    setPartnerFound: (b: boolean) => void;
}

export const useSocketStore = create<SocketStoreInterface>((set, get) => ({
    connected: false,
    connectedUsers: 0,
    queuePopulation: 0,
    roomId: null,
    partnerFound: false,

    setConnectedUsers: (num: number) => {
        set(state => ({ ...state, connectedUsers: num }))
    },
    setConnected: (connectionState: boolean) => {
        set(state => ({ ...state, connected: connectionState }))
    },
    setQueuePopulation: (num: number) => {
        set(state => ({ ...state, queuePopulation: num }))
    },
    setRoom: (roomId: string | null) => {
        set(state => ({ ...state, roomId }))
    },
    setPartnerFound: (b: boolean) => {
        set(state => ({ ...state, partnerFound: b }));
    }
}));