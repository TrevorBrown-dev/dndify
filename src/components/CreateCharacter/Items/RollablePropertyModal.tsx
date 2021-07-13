import { useCallback, useState } from 'react';
import { iCharacter } from 'src/models/character';
import { useDice } from 'src/models/dice/dice';
import { RollableProperty } from 'src/models/items';
/* 

This isnt working yet and neither is the item form, I think I need to start over with a cleaner approach...
Finally its starting to work, just needs some more cleanup
*/
interface RoallablePropertyModalProps {
    weaponProps: RollableProperty[];
    character: iCharacter;
}
export const RollablePropertyModal: React.FC<RoallablePropertyModalProps> = ({ weaponProps, character }) => {
    const [selectedProp, setSelectedProp] = useState(-1);
    const [diceString, setDiceString] = useState('');
    const { roll } = useDice(character);
    const mapWeaponProps = useCallback(() => {
        return weaponProps.map((wp, index) => {
            const classList = index !== selectedProp ? 'wp-row hoverable color-primary-hover ' : 'wp-row hoverable color-primary color-primary-hover';
            console.log('SELECTED: ', selectedProp);
            return (
                <div className={classList} key={index} onClick={() => setSelectedProp(index)}>
                    <div className='wp-name'>{wp.name}</div>
                    <div className='wp-dice'>{wp.magnitude}</div>
                    <div className='wp-type'>{wp.magnitudeType}</div>
                </div>
            );
        });
    }, [weaponProps, selectedProp, setSelectedProp]);
    const handleClick = () => {
        if (selectedProp === -1) return;
        setDiceString(roll(weaponProps[selectedProp].magnitude).value + '');
    };
    return (
        <div className='weapon-props-modal'>
            <div id='wp-list'>{mapWeaponProps()}</div>
            <div id='wp-dice-button'>
                <i className='fas fa-dice-d20 hoverable color-primary-hover' onClick={handleClick}></i>
            </div>
            <div className='wp-output'>
                <h2>{diceString}</h2>
            </div>
        </div>
    );
};
