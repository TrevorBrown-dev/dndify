import { CharacterProps } from ".";
import { Section } from "./Section";

export const Background: React.FC<CharacterProps> = ({ character }) => {
    return (
        <Section id="background" title="Background" header="Background" icon="fas fa-scroll" wikiReference="http://dnd5e.wikidot.com/#toc13">
            <div className="background-select">
                <input type="text" className="race-input" placeholder={"Acolyte"} value={character.background} onChange={(e) => character.setBackground(e.target.value)} />
            </div>
        </Section>
    );
}