import { forwardRef, Ref } from 'react';
import { useUserSettings } from "@store/userSettings"
interface VerticalDividerInterface {
    className?: string;
}
const VerticalDivider = forwardRef(({ className }: VerticalDividerInterface, ref: Ref<HTMLDivElement>) => {
    const userColor = useUserSettings(state => state.color);

    return (
        <div ref={ref} className={`vertical-divider bg-${userColor} ${className}`}></div>
    )
})

export default VerticalDivider;