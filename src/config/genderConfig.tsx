import FemaleIcon from "../atoms/FemaleIcon";
import MaleIcon from "../atoms/MaleIcon";
import NeutralIcon from "../atoms/NeutralIcon";
import { SwitchOptionInterface } from "../utils/interfaces/components/switch";

interface genderInterface {
    ownGender: SwitchOptionInterface[],
    partnerGender: SwitchOptionInterface[]
}

export const config: genderInterface = {
    ownGender: [{
        icon: <MaleIcon size={28} />,
        text: undefined
    },
    {
        icon: <FemaleIcon size={28} />,
        text: undefined
    }],
    partnerGender: [
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