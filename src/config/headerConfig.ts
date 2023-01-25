interface HeaderConfigInterface {
    useNavigationRoutes: string[],
    routeNames: { [id: string]: string },
    onlyBackButtonRoutes: string[],
    noBackground: string[],

}

export const config: HeaderConfigInterface = {
    useNavigationRoutes: ['settings', 'devlog', 'pre'],
    onlyBackButtonRoutes: ['pre'],
    noBackground: ['pre'],
    routeNames: {
        'devlogs': 'Verzióelőzmények',
        'settings': 'Beállítások',
        'settings/privacy': 'Adatvédelem',
        'settings/customize': 'Testreszabás',
        'settings/information': 'Névjegy',
        'settings/help': 'Súgó',
        'settings/contact': 'Kapcsolatfelvétel',
        'devlog': 'Verzióelőzmények'
    }
}