import { UserStatus } from '@utils/enums';
import { create } from 'zustand';

interface SocketStoreInterface {
    connected: boolean;
    connectedUsers: number;
    queuePopulation: number;
    roomId: roomIdInterface;
    partnerFound: boolean;
    partnerStatus: UserStatus | undefined;
    setConnectedUsers: (num: number) => void;
    setConnected: (connectionState: boolean) => void;
    setQueuePopulation: (num: number) => void;
    setRoom: (roomId: roomIdInterface) => void;
    setPartnerFound: (b: boolean) => void;
    setPartnerstatus: (status: UserStatus) => void;
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
    setPartnerstatus: (status: UserStatus) => {
        set(state => ({ ...state, partnerStatus: status }));
    }
}));