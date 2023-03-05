import versions from '@config/Versions.json';
import { UserStatus } from '@utils/enums';

type Props = {
    status: UserStatus,
}
type StatusCircleProps = {
    color: string,
}

const STATUS_COLORS = [
    'green',
    'orange',
    'red'
]

const StatusCircle = ({ color }: StatusCircleProps) => {
    const bgColor = 'bg-' + color;
    return (<div className={`w-[9px] h-[9px] rounded ${bgColor}`}></div>);
}

const Status = ({ status }: Props) => {
    return <StatusCircle color={STATUS_COLORS[status]} />
}

export default Status;