import React from "react";
import { iCharacter } from "../../models/character";
import { Section } from "./Section";
interface CreateCharacterRaceProps {
    character: iCharacter
}
export const Race: React.FC<CreateCharacterRaceProps> = ({ character }) => {
    return (
        <Section id="race" title="Race" header="Race" icon="fas fa-users" wikiReference="http://dnd5e.wikidot.com/race">
            <div className="race-select">
                <input type="text" className="race-input" placeholder={"Human"} value={character.race} onChange={(e) => character.setRace(e.target.value)} />
            </div>
        </Section>
    );
}