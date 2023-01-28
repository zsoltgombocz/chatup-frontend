import FemaleIcon from "../atoms/FemaleIcon";
import MaleIcon from "../atoms/MaleIcon";
import NeutralIcon from "../atoms/NeutralIcon";
import { SwitchOptionInterface } from "../utils/interfaces/components/switch";

interface sexInterface {
    ownSex: SwitchOptionInterface[],
    partnerSex: SwitchOptionInterface[]
}

export const config: sexInterface = {
    ownSex: [{
        icon: <MaleIcon size={28} />,
        text: undefined
    },
    {
        icon: <FemaleIcon size={28} />,
        text: undefined
    }],
    partnerSex: [
        {
            icon: <MaleIcon size={28} />,
            text: undefined
        },
        {
            icon: <NeutralIcon size={28} />,
            text: undefined
        }, {
            icon: <FemaleIcon size={28} />,
            text: undefined
        }
    ]
}