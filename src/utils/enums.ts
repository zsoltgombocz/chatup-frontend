export enum Gender {
    MALE = 0, FEMALE = 2, ALL = 1
}

export enum GeoLocationPermission {
    DENIED = 'denied', PROMPT = 'prompt', GRANTED = 'granted'
}

export enum SearchState {
    ACTIVE, RE_SEARCH
}

export enum PrePage {
    LOCATION = 'location', GENDER = 'gender', INTERESTS = 'interests'
}

export enum UserStatus {
    ONLINE, IDLE, DISCONNECTED,
}
