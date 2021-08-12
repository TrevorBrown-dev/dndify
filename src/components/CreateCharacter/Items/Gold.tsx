import { ChangeEventHandler, useEffect, useState } from 'react';
import { iMoneyModel, Money } from 'src/models/money';
import { CharacterProps } from '..';

interface MoneyInputProps {
    //The label for the input
    title: string;
    /** @description The money value for the input */
    value: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
const MoneyInput: React.FC<MoneyInputProps> = ({ title, value, onChange }) => {
    return (
        <div className='money-input'>
            <div className='center-grid-justified'>
                <div className='left'>
                    <label htmlFor={`m-${title}`}>{title}: </label>
                </div>
                <div className='right'>
                    <input type='number' value={value} onChange={onChange} />
                </div>
            </div>
        </div>
    );
};

export const Gold: React.FC<CharacterProps> = ({ character }) => {
    const [money, setMoney] = useState(character.money.money);
    const [cp, sp, ep, gp, pp] = character.money.money;
    useEffect(() => {
        console.log('Effecting');
        character.money.setMoney(money);
    }, [money]);
    const handleChangeGenerator =
        (m: Money): ChangeEventHandler<HTMLInputElement> =>
        (e) => {
            console.log('RUNNING');
            try {
                setMoney((oldMoney: iMoneyModel) => {
                    return oldMoney.map((val, i) => {
                        return i === m ? parseInt(e.target.value) : val;
                    }) as iMoneyModel;
                });
            } catch {}
            console.log(money);
        };
    return (
        <div className='create-sec-gold'>
            <MoneyInput title='Copper' value={cp} onChange={handleChangeGenerator(Money.COPPER)} />
            <MoneyInput title='Silver' value={sp} onChange={handleChangeGenerator(Money.SILVER)} />
            <MoneyInput title='Electrum' value={ep} onChange={handleChangeGenerator(Money.ELECTRUM)} />
            <MoneyInput title='Gold' value={gp} onChange={handleChangeGenerator(Money.GOLD)} />
            <MoneyInput title='Platinum' value={pp} onChange={handleChangeGenerator(Money.PLATINUM)} />
        </div>
    );
};
