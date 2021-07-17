import { Dispatch, useState } from 'react';
import { Rollable } from 'src/models/items';
import { blankSpell, iSpellModel } from 'src/models/spells';
import { CharacterProps } from '..';
import { RollablePropertyForm } from '../Items/RollableProperty';
import { Section } from '../Section';
import { SpellForm } from './SpellForm';

export const Spells: React.FC<CharacterProps> = ({ character }) => {
    const [spell, setSpell] = useState<iSpellModel>(blankSpell);
    return (
        <Section header='Spells' icon='fas fa-magic' id='spells' title='Spells' wikiReference='http://dnd5e.wikidot.com/spells'>
            <div className="create-sec-spells">
                <SpellForm />
                <RollablePropertyForm item={spell} setItem={setSpell as Dispatch<React.SetStateAction<Rollable>>} />
            </div>
        </Section>
    );
};
