interface HeaderConfigInterface {
    useNavigationRoutes: string[],
    routeNames: { [id: string]: string };

}

export const config: HeaderConfigInterface = {
    useNavigationRoutes: ['settings'],
    routeNames: {
        'devlogs': 'Verzióelőzmények',
        'settings': 'Beállítások',
        'settings/privacy': 'Adatvédelem'
    }
}