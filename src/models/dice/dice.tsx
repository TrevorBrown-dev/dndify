import { useCallback, useEffect, useState } from "react";
import { CharacterProps } from "../../components/CreateCharacter";
import { iCharacter } from "../character";
import { computeDice, DiceReport } from "./computeDice";
import { DiceExpressionReport, parseExpression } from "./parseExpression";


interface iDice {
    roll: (diceString: string) => DiceExpressionReport;
    DiceRoller: React.FC<CharacterProps>;
}
export const useDice = (character: iCharacter) => {

    const roll = useCallback(
        (diceString: string) => parseExpression(diceString),
        [character],
    )

    const DiceRoller: React.FC<CharacterProps> = ({ character }) => {
        const [diceString, setDiceString] = useState("")
        const [val, setVal] = useState(0);
        return (<div>
            <input type="text" value={diceString} onChange={e => setDiceString(e.target.value)} />
            <button onClick={e => setVal(roll(diceString).value)}>Roll</button>
            <span>Value: {val}</span>
            
        </div>)
    }
    const obj: iDice = {
        roll,
        DiceRoller
    }

    return obj;

}