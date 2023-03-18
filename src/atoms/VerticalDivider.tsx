import { useUserSettings } from "@store/userSettings"

const VerticalDivider = () => {
    const userColor = useUserSettings(state => state.color);

    return (
        <div className={`vertical-divider bg-${userColor}`}></div>
    )
}

export default VerticalDivider