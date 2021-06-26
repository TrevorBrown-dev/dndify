import { evaluate } from 'mathjs';
import { iCharacter } from '../character';
import { computeDice, diceRegex, DiceReport } from './computeDice';
import { parseStat } from './parseStat';

export interface DiceExpressionReport {
    expression: string;
    reports: DiceReport[];
    value: number;
    error?: Error;
}
export const parseExpression = (diceExpr: string, character: iCharacter): DiceExpressionReport => {
    const statRegex = /(?:con|wis|str|int|cha|dex)[a-zA-Z]*/gi;
    const report: DiceExpressionReport = {
        expression: diceExpr,
        value: 0,
        reports: [],
    };
    try {
        const parsedExpr = diceExpr.replaceAll(diceRegex, (ex) => {
            const rep = computeDice(ex);
            report.reports.push(rep);
            return rep.value.toString();
        }).replaceAll(statRegex, (ex) => {
            ex = ex.substr(0, 3).toLowerCase();
            const stat = parseStat(ex, character);
            console.log(ex, stat)
            return stat + "";
        });
        report.value = evaluate(parsedExpr);
    } catch (e) {
        report.error = e;
        alert('Invalid Expression!');
        console.log(e);
    }

    return report;
};
