import React from "react";
import { iCharacter } from "../../models/character";
import { Section } from "./";

interface CreateCharacterClassProps {
    character: iCharacter;
}
export const Class: React.FC<CreateCharacterClassProps> = ({ character }) => {
    /*
        We need a solid module for handling these classes.
        A class needs to be attached to the character model as an array of strings
    */
    const classes = [
        'Artificer', 'Barbarian', 'Bard',
        'Blood Hunter', 'Cleric', 'Druid', 'Fighter',
        'Monk', 'Paladin', 'Ranger', 'Rogue',
        'Sorcerer', 'Warlock', 'Wizard'
    ]


    const renderClasses = () => {
        return classes.map((c) => {
            return (
                <div key={`class-${c}`} className={'class ' + (character.classes.includes(c) ? 'selected' : '')} onClick={() => character.classes.toggleClass(c)}>
                    <h3>{c}</h3>
                </div>
            );
        });
    }

    return (
        <Section id="class" title="Class" header="Class" icon="fas fa-magic" wikiReference="http://dnd5e.wikidot.com/#toc20">
            <div className="class-select">
                {renderClasses()}
            </div>
        </Section>
    )
}