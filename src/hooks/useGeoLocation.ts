import { useEffect, useMemo, useState } from "react";
import { counties } from "../config/mapConfig";
import { GeoLocationPermission } from "../utils/enums";
import { GeoLocation } from "../utils/interfaces/geoLocation";
import { CountyInterface } from "../utils/interfaces/map";
import { isSimilar } from "../utils/string";

interface useGeoLocationInterface {
    permission: GeoLocationPermission,
    geoLocation: Promise<null | CountyInterface>,
}

export const useGeoLocation = (): useGeoLocationInterface => {
    const [permission, setPermission] = useState<GeoLocationPermission>(GeoLocationPermission.DENIED);
    const [location, setLocation] = useState<GeoLocation | null>(null);

    const fetchLocationInfo = (coords: GeoLocation): Promise<any> => {
        return new Promise((resolve, reject) => {
            fetch(`https://api.geoapify.com/v1/geocode/reverse?apiKey=${import.meta.env.VITE_GEOAPI_KEY}&lat=${coords.lat}&lon=${coords.lon}`)
                .then(response => response.json())
                .then(result => resolve(result.features[0].properties.county))
                .catch(err => reject(err))
        });
    }

    const getLocation = (): void => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setLocation({ lat: coords.latitude, lon: coords.longitude });
            },
            (err) => { console.log(err) }
        );
    }

    const geoLocation: Promise<null | CountyInterface> = useMemo(async () => {
        if (location === null) return null;

        const county = await fetchLocationInfo(location);
        const similar = counties.filter(c => isSimilar(c.name, county));
        return similar[0];

    }, [location]);

    useEffect(() => {
        navigator.permissions.query({ name: 'geolocation' })
            .then(perm => {
                const p = perm.state.toUpperCase();
                setPermission(GeoLocationPermission[p as keyof typeof GeoLocationPermission]);
            });
    }, []);

    useEffect(() => {
        if ((permission === GeoLocationPermission.PROMPT || permission === GeoLocationPermission.GRANTED)
            && geoLocation === null) getLocation();
    }, [permission])


    return { permission, geoLocation };
}