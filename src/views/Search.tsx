import React, { useEffect, useState } from 'react'

import { io } from "socket.io-client";
import { useUserToken } from '../store/userToken';


type Props = {}


const Search = (props: Props) => {
    const [connectedUsers, setConnectedUsers] = useState(0);
    const [socket, setSocket] = useState<any>(undefined);
    const savedtoken = useUserToken(state => state.token);
    const saveToken = useUserToken(state => state.setToken);


    useEffect(() => {
        const s = io("http://localhost:3000", { auth: { token: savedtoken } });
        setSocket(s);
    }, []);

    useEffect(() => {
        socket?.on('usersChanged', (data: any) => setConnectedUsers(data));
        socket?.once('userAuthDone', (data: any) => saveToken(data));
    }, [socket]);

    return (
        <div>{connectedUsers}</div>
    )
}

export default Search