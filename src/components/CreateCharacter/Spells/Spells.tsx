import { useCallback } from 'react';
import { Dispatch, useState } from 'react';
import { Rollable } from 'src/models/items';
import { blankSpell, iSpellModel } from 'src/models/spells';
import { CharacterProps } from '..';
import { AddRPHeader } from '../Items';
import { RollablePropertyForm } from '../Items/RollableProperty';
import { Section } from '../Section';
import { SpellCard } from './SpellCard';
import { SpellForm } from './SpellForm';

export const Spells: React.FC<CharacterProps> = ({ character }) => {
    const [spell, setSpell] = useState<iSpellModel>(blankSpell);
    const handleSubmit = useCallback(() => {
        if (!spell.name) return;
        character.spells.addSpell(spell);
        setSpell(blankSpell);
    }, [spell, setSpell]);

    const MapSpells = () => {
        const cards: JSX.Element[] = [];
        character.spells.spells.forEach((level) => {
            level.forEach((spell) => {
                cards.push(<SpellCard spell={spell} character={character} />);
            });
        });
        return cards;
    };

    return (
        <Section header='Spells' icon='fas fa-magic' id='spells' title='Spells' wikiReference='http://dnd5e.wikidot.com/spells'>
            <div className='create-sec-spells'>
                <SpellForm spell={spell} setSpell={setSpell} />
                <div style={{ paddingTop: '.5em' }}>
                    <AddRPHeader />
                    <RollablePropertyForm item={spell} setItem={setSpell as Dispatch<React.SetStateAction<Rollable>>} />
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit}>Add Spell</button>
                </div>
                <div className='item-cards-container'>
                    <fieldset className='item-cards'>
                        <legend>Spells</legend>
                        {MapSpells()}
                    </fieldset>
                </div>
            </div>
        </Section>
    );
};
