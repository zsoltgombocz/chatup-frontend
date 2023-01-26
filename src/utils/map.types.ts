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

export interface CountyInterface {
    id: County,
    name: string,
    isSelected: boolean,
    path: string,
}

export interface MapInterface {
    counties: CountyInterface[]
}