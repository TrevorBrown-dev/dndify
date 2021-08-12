import { useState } from 'react';
import { useCallback } from 'react';
import { useDice } from 'src/models/dice/dice';
import { DiceExpressionReport } from 'src/models/dice/parseExpression';
import { CharacterProps } from '../CreateCharacter';
import { Sidebar } from '../Sidebar';
import { DiceListItem } from './DiceListItem';

export const DiceSidebar: React.FC<CharacterProps> = ({ character }) => {
    const diceValues = Object.freeze([20, 12, 10, 8, 6, 4]);
    const [diceReport, setDiceReport] = useState<DiceExpressionReport>();
    const dice = useDice(character);
    const onRollClickFactory = useCallback((amount: number, magnitude: number): React.MouseEventHandler<HTMLElement> => {
        return () => {
            const dString = `d${magnitude}`;
            const roll = dice.roll(`${amount}${dString}`);
            setDiceReport(roll);
        };
    }, []);

    return (
        <Sidebar>
            <div className='sidebar-dice'>
                <header className='sidebar-dice-report'>
                    <span>{diceReport?.value || ''}</span>
                </header>
                <div className='sidebar-rollable-dice'>
                    {diceValues.map((v) => (
                        <DiceListItem character={character} magnitude={v} />
                    ))}
                </div>
                <div className='sidebar-stats'></div>
                <div className='sidebar-saving-throws'></div>
            </div>
        </Sidebar>
    );
};
