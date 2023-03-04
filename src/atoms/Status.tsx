import versions from '@config/Versions.json';
import { UserStatus } from '@utils/enums';

type Props = {
    status: UserStatus,
}
type StatusCircleProps = {
    color: string,
}

const STATUS_COLORS = [
    '#24FF00',
    '#B08E37',
    '#B03737'
]

const StatusCircle = ({ color }: StatusCircleProps) => {
    const bgColor = 'bg-[' + color + ']';
    return (<div className={`w-[9px] h-[9px] ${bgColor} rounded`}></div>);
}

const Status = ({ status }: Props) => {
    return <StatusCircle color={STATUS_COLORS[status]} />
}

export default Status;