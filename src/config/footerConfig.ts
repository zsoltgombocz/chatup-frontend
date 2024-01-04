interface FooterConfigInterface {
    useStaticFooterRoutes: string[],
}

export const config: FooterConfigInterface = {
    useStaticFooterRoutes: ['settings', 'devlog']
}