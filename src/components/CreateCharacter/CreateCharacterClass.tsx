import React from "react";
import { iCharacter } from "../../models/character";
import { LinkedHeader } from "../misc/LinkedHeader";
import { WikiReference } from "../misc/WikiReference";

interface CreateCharacterClassProps {
    character: iCharacter;
}
export const CreateCharacterClass: React.FC<CreateCharacterClassProps> = ({ character }) => {
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
                <div key={`class-${c}`} className={'class ' + (character.classes.classes.includes(c) ? 'selected' : '')} onClick={() => character.classes.toggleClass(c)}>
                    <h3>{c}</h3>
                </div>
            );
        });
    }

    return (
        <div className="create-header create-class">
            <LinkedHeader id="class" >
                <i className="fas fa-magic" style={{ marginRight: '1em' }}></i>Class
            </LinkedHeader>
            <WikiReference href="http://dnd5e.wikidot.com/#toc20" />
            <div className="create-body">
                <div className="class-select">
                    {renderClasses()}

                </div>
            </div>
        </div>
    )
}