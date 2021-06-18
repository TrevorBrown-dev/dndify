/*
    This file should be reworked.
   Features needed: The abillity to chain operations
   a map of possible operators

   So there are three types of operands:
   dice, stat modifiers and plain numbers
   so a dice operands looks like this:
       h:xdy
   ex: 2:4d8
   h -> the highest number of dice to take
   x -> the number of total dice to roll
   y -> the size of the dice

   A stat operand can be any of the following:
   str, wis, dex, int, con, cha

   Then finally there are plain old numbers:
   3, 54, 69

   Plan:
   given the dice string 4:2d6 + str * 2
   we would first go through and compute all of the non-number operands. The dice would
   get rolled and computed, and the stats would be looked up and replaced with their numbers
*/
import React, { useCallback, useState } from 'react';

export interface iDice {
    value: number,
    rolls: number[],
    roll: (diceInput: string) => number | undefined,
}

const computeDice = (dice: string): number => {
    const match = dice.match(/(\d+:)?\d+d\d+/);
    if (!(match && match[0] === dice))
        return 0;
    
    //The dice string is guarenteed to be in proper format now
    
    return 0;
}

export const useDice = () => {
    const [value, setValue] = useState(0);
    const [rolls, setRolls] = useState<number[]>([]);

    const highestNRolls = useCallback((n: number, rolls: number[]) => {
        //santize the input to be a positive integer
        n = Math.abs(Math.floor(n));
        rolls = rolls.sort((a, b) => {
            return a - b;
        });
        rolls = rolls.slice(n * -1);
        return rolls;
    },[]);


    const roll = useCallback(
        (diceInput: string) => {
            if (!/(\d+:)?\d+d\d+((\+|\*|-|\/|%|\^)\d+)?/.test(diceInput)) {
                return;
            }
            const rollDice = (size: number) => {
                const min = 1;
                size = Math.floor(size);
                return Math.floor(Math.random() * (size - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
            };
            diceInput = diceInput.toLowerCase().replace(/ +/, '');
            //Precondition: the diceInput string matches the correct regex for dice
            //examples: 2d6+3, 2d8*2
            let op = '';
            enum Ops {
                add = '+',
                sub = '-',
                mult = '*',
                div = '/',
                mod = '%',
                pow = '^',
            }
            const ops: Ops[] = [Ops.add, Ops.sub, Ops.mult, Ops.div, Ops.mod, Ops.pow];
            ops.forEach((o) => {
                if (diceInput.includes(o)) {
                    op = o;
                }
            });
            if (!op) {
                op = Ops.add;
                diceInput += op + '0';
            }

            const [dice, modifier] = diceInput.split(/\+|\*|-|\/|%|\^/);
            let [diceExpression, sizeOfDice] = dice.split('d');
            if (!diceExpression.includes(':')) {
               diceExpression = `${diceExpression}:${diceExpression}` 
            }
            const [nRolls,numOfDice ] = diceExpression.split(':');
            const _rolls = [];
            for (let i = 0; i < parseInt(numOfDice); i++) {
                _rolls.push(rollDice(parseInt(sizeOfDice)));
            }
            setRolls(_rolls);
            const rolls = highestNRolls(parseInt(nRolls), _rolls);
            setRolls(rolls);
            const sum = rolls.length !== 0 ? rolls.reduce((p, c) => p + c) : 0;
            let summedRolls = 0;
            switch (op) {
                case Ops.add:
                    summedRolls = sum + parseFloat(modifier);
                    break;
                case Ops.sub:
                    summedRolls = sum - parseFloat(modifier);
                    break;
                case Ops.mult:
                    summedRolls = sum * parseFloat(modifier);
                    break;
                case Ops.div:
                    summedRolls = sum / parseFloat(modifier);
                    break;
                case Ops.mod:
                    summedRolls = sum % parseFloat(modifier);
                    break;
                case Ops.pow:
                    summedRolls = Math.pow(sum, parseFloat(modifier));
                    break;
                default:
                    summedRolls = sum + parseFloat(modifier);
                    break;
            }
            setValue(summedRolls);
            return summedRolls;
        },
        [setRolls, highestNRolls]
    );

  
        const dice: iDice = {
            value,
            roll,
            rolls,
        };
    return dice;
};
export const Dice: React.FC = () => {
    const [diceString, setDiceString] = useState('');
    const dice = useDice();

    return (
        <div>
            <input type='text' value={diceString} onChange={(e) => setDiceString(e.target.value)} name='dice' pattern='(\d+:)?\d+d\d+((\+|\*|-|\/|%|\^)\d+)?' />
            <button onClick={() => dice.roll(diceString)}>Roll</button>
            Output: <span>{dice.value === 0 ? '' : dice.value}</span>
            <br />
            {dice.rolls.length !== 0 ? 'Rolls: ' + dice.rolls.join(', ') : ''}
        </div>
    );
};
