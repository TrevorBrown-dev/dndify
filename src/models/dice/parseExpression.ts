import {evaluate} from "mathjs";
import { computeDice, diceRegex, DiceReport } from "./computeDice";

export interface DiceExpressionReport {
    expression: string;
    reports: DiceReport[];
    value: number;
    error?: Error;
}
export const parseExpression = (diceExpr: string): DiceExpressionReport => {
    const report: DiceExpressionReport = {
        expression: diceExpr,
        value: 0,
        reports: [],
    }
    try {
        const parsedExpr = diceExpr.replaceAll(diceRegex, (ex) => {
            
            const rep = computeDice(ex);
            report.reports.push(rep);
            return rep.value.toString();

        });
        report.value = evaluate(parsedExpr);

    } catch (e) {
        report.error = e;
        alert("Invalid Expression!")
    }
    
    return report;
}