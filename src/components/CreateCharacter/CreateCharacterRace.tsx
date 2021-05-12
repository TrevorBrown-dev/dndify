import React from "react";
import { iCharacter } from "../../models/character";
import { WikiReference } from "../misc/WikiReference";
import { LinkedHeader } from '../misc/LinkedHeader';
interface CreateCharacterRaceProps {
    character: iCharacter
}
export const CreateCharacterRace: React.FC<CreateCharacterRaceProps> = ({ character }) => {
    return (
        <div className="create-header create-race">
            <LinkedHeader id="race" >
                <i className="fas fa-users" style={{ marginRight: '1em' }}></i>Race
            </LinkedHeader>
            <WikiReference href="http://dnd5e.wikidot.com/race" />
            <div className="create-body">
                <div className="race-select">
                    <input type="text" className="race-input" placeholder={"Human"} value={character.race} onChange={(e) => character.setRace(e.target.value)} />

                </div>
            </div>
        </div>
    );
}