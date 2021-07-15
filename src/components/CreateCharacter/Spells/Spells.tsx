import { CharacterProps } from '..';
import { Section } from '../Section';

export const Spells: React.FC<CharacterProps> = ({ character }) => {
    return (
        <Section header='Spells' icon='fas fa-magic' id='spells' title='Spells' wikiReference='http://dnd5e.wikidot.com/spells'>
            Spells
        </Section>
    );
};
