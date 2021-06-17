import { useCallback } from "react";
import { iCharacter } from "../character";
import { computeDice, DiceReport } from "./computeDice";

interface iDice {
    roll: (diceString: string) => DiceReport;
}
export const useDice = (character: iCharacter) => {
    const roll = useCallback(
        (diceString: string) => computeDice(diceString),
        [character],
    )

    const obj: iDice = {
        roll
    }

    return obj;

}