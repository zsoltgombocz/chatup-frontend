interface HeaderConfigInterface {
    useNavigationRoutes: string[],
    routeNames: { [id: string]: string };

}

export const config: HeaderConfigInterface = {
    useNavigationRoutes: ['settings', 'devlog'],
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