import { useCallback, useEffect, useState } from "react";
export enum CheckState {
    off = 0,
    on = 1,
    superOn = 2
}


interface TripleCheckBoxProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    name?: string;
    value?: 0 | 1 | 2;
    setValue?: (value: number) => void;
    onStateChange?: (newState: CheckState) => void;


}
const icons = ["far fa-circle", "fas fa-dot-circle", "fas fa-circle"];


interface TripleCheckBoxProficiencyProps {
    style?: React.CSSProperties;
}
export const TripleCheckBoxLegend: React.FC<TripleCheckBoxProficiencyProps> = ({ style }) => {
    return (

        <div style={{ ...style, display: 'flex', justifyContent: 'space-around', width: '100%', padding: '0em 4em' }}>
            <div><i className={icons[0]}></i> <span>No Proficiency</span></div>
            <div><i className={icons[1]}></i> <span>Single Proficiency</span></div>
            <div><i className={icons[2]}></i> <span>Double Proficiency</span></div>
        </div>
    );
}

export const TripleCheckBox: React.FC<TripleCheckBoxProps> = ({ id, className, name, style, value, setValue }) => {
    const [checkState, setCheckState] = useState<CheckState>(value || CheckState.off);
    useEffect(() => {
        setCheckState(value as unknown as CheckState);
    }, [value, setCheckState])
    const cycleState = useCallback(() => {
        setCheckState(oldState => {
            //Initial State
            let state: CheckState = CheckState.off;
            //Cycle the states between 0 1 or 2 (off, on, or superOn)
            switch (oldState) {
                case CheckState.off:
                    state = CheckState.on;
                    break;
                case 1:
                    state = CheckState.superOn;
                    break;
                case 2:
                default:
                    state = CheckState.off;
                    break;
            }
            if (setValue)
                setValue(state);

            //Apply the state locally
            return state;
        });
    }, [setCheckState, setValue]);


    return (

        <div className={`${className} checkbox`} onClick={(e) => {
            e.stopPropagation();
            cycleState()
        }} style={style}>
            <input type="checkbox" name={name} style={{ cursor: 'pointer', display: 'none' }} id={id} />
            <i className={`${icons[checkState]} triple-check-box`} style={{ cursor: 'pointer' }}></i>

        </div>
    );
}