import { useCallback, useState } from "react";
import { iCharacterModel, iSerializable } from "./character";
export enum Money {
    COPPER,
    SILVER,
    ELECTRUM,
    GOLD,
    PLATINUM
}

const mapMoney = (money: Money): [string, string] => {
    const map: [string,string][] = [['Copper', 'CP'], ['Silver', 'SP'], ['Electrum', 'EP'], ['Gold', 'GP'], ['Platinum', 'PP']]
    return map[money];
}
export type iMoneyModel = [number,number,number,number,number]
export type iMoney = ReturnType<typeof useMoney>;
    export const useMoney = (m: iMoneyModel) => {
        const [money, setMoney] = useState<iMoneyModel>(m || [0, 0, 0, 0, 0]);
        const _modifyMoney = useCallback((money: Money, amount: number) => {
            setMoney((oldMoney) => {
                oldMoney[money] += amount;
                return oldMoney;
            })
        }, [setMoney])
        const addMoney = useCallback((money: Money, amount: number) => {
            setMoney((oldMoney) => {
                oldMoney[money] += Math.abs(amount);
                return oldMoney;
            })
        }, [setMoney])
        const removeMoney = useCallback((money: Money, amount: number) => {
            setMoney((oldMoney) => {
                oldMoney[money] += Math.abs(amount) * -1;
                return oldMoney;
            })
        }, [setMoney])

        const serialize = useCallback(() => money, [money]);
        const deserialize = useCallback((money: iMoneyModel) => setMoney(money), [setMoney]);

        const obj = {
            money,
            addMoney,
            removeMoney, 
            serialize,
            deserialize
            
        }
        
        return obj;
}