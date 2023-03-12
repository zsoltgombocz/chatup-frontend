import { UserStatus } from '@utils/enums';
import { motion as m, MotionProps } from 'framer-motion';
import { Ref, forwardRef } from 'react';

type Props = {
    status: UserStatus,
}

const STATUS_COLORS = [
    'bg-status-green',
    'bg-status-orange',
    'bg-status-red'
]

const Status = forwardRef(({ status }: Props, ref: Ref<HTMLDivElement>) => {
    return (<m.div className={`w-[9px] h-[9px] rounded ${STATUS_COLORS[status]}`} ref={ref} />);
});

export default Status;