import { Feats } from './components/CreateCharacter/Feats';
import { FeatCard } from './components/CreateCharacter/Feats/FeatCard';
import { SpellCard } from './components/CreateCharacter/Spells/SpellCard';
import { usePopup } from './components/misc/Notification';
import { SlidingIconButton } from './components/misc/SlidingIconButton';
import { useModal } from './components/Modal';
import { blankCharacter, useCharacter } from './models/character';
import { iSpellModel } from './models/spells';
import { SPELL_LEVEL } from './models/spells/SpellLevel';
import { SPELL_SCHOOL } from './models/spells/SpellSchool';
/* 
    TODO: Rework the RollableProp form to be used twice.
    TODO: Rework the RollableProp modal to be used twice.

*/
interface SpellRegistry {
    [key: string]: iSpellModel;
}
const spells: SpellRegistry = {
    'Acid Splash': {
        name: 'Acid Splash',
        casting_time: 'instant',
        school: SPELL_SCHOOL.CONJURATION,
        level: SPELL_LEVEL.CANTRIP,
        component: 'V, S',
        duration: 'Instantaneous',
        description:
            'You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.',
        range: '60 feet',
        rollableProps: [],
    },
};

export const Testing: React.FC = () => {
    const char = useCharacter(blankCharacter());
    const [toggleOpen, modal] = useModal(
        <div className='edit-modal'>
            <Feats character={char} />
        </div>
    );
    return (
        <div
            style={{
                background: 'white',
                height: '100vh',
                gridColumn: '1/-1',
            }}
        >
            {modal}
            <button onClick={() => toggleOpen()}>Open</button>
        </div>
    );
};
