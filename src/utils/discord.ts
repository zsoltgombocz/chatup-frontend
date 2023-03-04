export const getEmbedObject = (date: Date, type: string, platform: string, browser: string, description: string): Object => {
    return {
        "embeds": [
            {
                "title": "Új bejelentés",
                "color": 3452092,
                "timestamp": date.toISOString(),
                "fields": [
                    {
                        "name": "Jelentés típusa",
                        "value": `> ${type}`,
                        "inline": false
                    },
                    {
                        "name": "Platform",
                        "value": `> ${platform}`,
                        "inline": false
                    },
                    {
                        "name": "Böngésző típusa ",
                        "value": `> ${browser}`,
                        "inline": true
                    },
                    {
                        "name": "Jelentés részletezése",
                        "value": `> ${description}`,
                        "inline": false
                    }
                ]
            }
        ],
        "description": date.toLocaleString()
    }
}