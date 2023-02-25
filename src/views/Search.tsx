import React, { useEffect, useState } from 'react'

import { io } from "socket.io-client";
import { useGenderPreferebces } from '../store/genderPreferences';
import { useInterestPreferences } from '../store/interestPreferences';
import { useMapPreferences } from '../store/mapPreferences';
import { useUserData } from '../store/userData';


type Props = {}


const Search = (props: Props) => {
    const [connectedUsers, setConnectedUsers] = useState(0);
    const [status, setStatus] = useState(null);
    const [socket, setSocket] = useState<any>(undefined);
    const savedtoken = useUserData(state => state.token);
    const saveToken = useUserData(state => state.setToken);
    const selectedCounties = useMapPreferences(state => state.counties);
    const location = useUserData(state => state.location)?.id;
    const countryWide = useMapPreferences(state => state.mapCheckbox);
    const interests = useInterestPreferences(state => state.interests);
    const ownGender = useGenderPreferebces(state => state.ownGender);
    const partnerGender = useGenderPreferebces(state => state.partnerGender);


    useEffect(() => {
        const s = io("http://localhost:3000", { auth: { token: savedtoken } });
        setSocket(s);

        return () => {
            s?.emit('cancelSearch');
        }
    }, []);

    useEffect(() => {
        socket?.on('userNumberChanged', (data: any) => setConnectedUsers(data));
        socket?.on('userStatusChanged', (data: any) => setStatus(data));
        socket?.once('userAuthDone', (data: any) => saveToken(data));
        socket?.emit('updateData', { location, counties: selectedCounties, mapPref: countryWide, interests, partnerGender, ownGender });
    }, [socket]);

    return (
        <>
            <div>{connectedUsers}</div>
            <div>{status || 'unknown'}</div>
        </>
    )
}

export default Search