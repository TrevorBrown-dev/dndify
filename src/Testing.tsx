import { SpellCard } from './components/CreateCharacter/Spells/SpellCard';
import { useModal } from './components/Modal';
import { SPELL_LEVEL, SPELL_SCHOOL } from './models/spells';
const spells = {
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
        spellProps: [],
    },
};
export const Testing: React.FC = () => {
    return (
        <div
            style={{
                background: 'white',
                height: '100vh',
                gridColumn: '1/-1',
            }}
        >
            <SpellCard spell={spells['Acid Splash']} />
        </div>
    );
};
