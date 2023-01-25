export interface CountyInterface {
    id: string,
    name: string,
    isSelected: boolean,
    path: HTMLOrSVGElement,
}

export interface MapInterface {
    counties: CountyInterface[]
}