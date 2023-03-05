export enum County {
    NOGRAD = 'nograd',
    HEVES = 'heves',
    JNSZ = 'jnsz',
    BP = 'budapest',
    PEST = 'pest',
    FEJER = 'fejer',
    VESZP = 'veszprem',
    TOLNA = 'tolna',
    KE = 'ke',
    GYMS = 'gyms',
    VAS = 'vas',
    ZALA = 'zala',
    SOMOGY = 'somogy',
    BARANYA = 'baranya',
    BK = 'bk',
    CSONGRAD = 'csongrad',
    HB = 'hb',
    BEKES = 'bekes',
    SZSZB = 'szszb',
    BAZ = 'baz'
}

export enum Location {
    UNKNOWN = 'unknown', NOT_DEFINED = 'not_defined'
}

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
