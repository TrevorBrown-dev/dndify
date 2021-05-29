import { CharacterProps } from ".";
import { Section } from "./Section";

export const Alignment: React.FC<CharacterProps> = ({ character }) => {
    return (
        <Section header="Alignment" icon="fas fa-eclipse" id="aligment" title="Alignment" wikiReference="https://dnd5e.info/beyond-1st-level/alignment/">
            Alignment
        </Section>
    );
}