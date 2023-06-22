interface HeaderConfigInterface {
    useNavigationRoutes: string[],
    onlyBackButtonRoutes: string[],
    noBackground: string[],
    hideHeaderRoutes: string[]
}

export const config: HeaderConfigInterface = {
    useNavigationRoutes: ['settings', 'devlog', 'pre'],
    onlyBackButtonRoutes: [],
    noBackground: ['pre'],
    hideHeaderRoutes: ['search', 'chat'],
}