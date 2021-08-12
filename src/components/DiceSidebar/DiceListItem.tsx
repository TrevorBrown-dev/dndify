import { CharacterProps } from '../CreateCharacter';
interface DiceListItemProps extends CharacterProps {
    magnitude: number;
}
export const DiceListItem: React.FC<DiceListItemProps> = ({ character, magnitude }) => {
    return (
        <li className='rollable-dice-item' title={`d${magnitude}`}>
            <input type='number' name={`dice-input-amount-d${magnitude}`} id={`dice-input-amount-d${magnitude}`} defaultValue={1} />
            <span>
                <i className={`fas fa-dice-d${magnitude}`}></i> +
            </span>
            <input type='text' name={`dice-input-mod-d${magnitude}`} id={`dice-input-mod-d${magnitude}`} placeholder='Con' />
            <i className='fas fa-dice hoverable color-primary-hover'></i>
        </li>
    );
};
