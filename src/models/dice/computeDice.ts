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
export const diceRegex = /((\d+:)?\d+d\d+)/g;
export const diceRegexNoCap = /(?:\d+:)?\d+d\d+/;

export interface DiceReport {
    diceExpr: string;
    highestN?: number;
    lowestN?: number;
    numOfDice: number;
    magnitude: number;
    rolls: number[];
    filteredRolls: number[];
    value: number;
}
export const computeDice = (dice: string): DiceReport => {
    dice = dice.toLowerCase();

    const match = dice.match(diceRegex);
    const diceReport: DiceReport = {
        diceExpr: dice,
        numOfDice: -1,
        magnitude: -1,
        rolls: [],
        filteredRolls: [],
        value: -1,
    };
    if (!(match && match[0] === dice)) return diceReport;
    //The dice string is guarenteed to be in proper format now

    const expr = dice.split(':');
    if (expr.length > 1) {
        const high = expr.shift();
        if (high) diceReport.highestN = parseInt(high);
    }
    const expr2 = expr[0].split('d');
    diceReport.numOfDice = parseInt(expr2[0]);
    diceReport.magnitude = parseInt(expr2[1]);
    const rollDice = (size: number) => {
        const min = 1;
        size = Math.floor(size);
        return Math.floor(Math.random() * (size - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    };

    const diceArr: number[] = [];
    for (let i = 0; i < diceReport.numOfDice; i++) {
        diceArr.push(rollDice(diceReport.magnitude));
    }

    diceReport.rolls = diceArr;
    diceReport.filteredRolls = diceReport.rolls;

    if (diceReport.highestN) {
        const sortedCopy = [...diceReport.rolls].sort((a, b) => a + b);
        diceReport.filteredRolls = sortedCopy.splice(0, Math.min(diceReport.highestN, sortedCopy.length));
    }
    diceReport.value = diceReport.filteredRolls.reduce((a, b) => a + b);
    return diceReport;
};
