import React from "react";
import { CharacterProps } from ".";
import { iCharacter } from "../../models/character";
import { iStatModel } from "../../models/stats";
import { useDice } from "../../models/dice/dice";
import { CharacterInfo } from "./CharacterInfo";



const StatHeaders: React.FC<CharacterProps> = ({ character }) => {
    const dice = useDice(character);


    const onStatHeaderClick = (stat: iStatModel) => {
        character.stats.setValue({ ...stat, value: dice.roll("3:4d6").value || 0 });
    }
    const rollStats = (character: iCharacter) => {
        const { stats } = character.stats;
        stats.forEach(stat => {
            character.stats.setValue({ ...stat, value: dice.roll('3:4d6').value || 0 });
        });
    }
    const buildHeaders = (character: iCharacter) => {
        const { stats } = character.stats;
        return stats.map(stat => {
            const { value, name, short_name } = stat;
            const modifier = character.stats.modifier(name);
            return (
                <div className="stat-header-wrapper" key={`header-${name}`}>
                    <div className="stat-header" title={stat.name} onClick={() => onStatHeaderClick(stat)}>
                        <div className="stat-name">{short_name || name}</div>
                        <div className="stat-value">{value}<sub style={{ color: "#000" }}>({(modifier >= 0) ? `+${modifier}` : modifier})</sub></div>
                    </div>
                    <input type="number" key={name} style={{ width: '5ch' }} value={value} onChange={(e) => { character.stats.setValue({ ...stat, value: parseInt(e.target.value) || 0 }) }} />
                </div>
            );
        })
    }

    return (
        <div className="stat-headers">
            <i className="fas fa-dice stat-dice" title="Roll all Stats" onClick={() => rollStats(character)}></i>
            {buildHeaders(character)}
        </div>
    );



}



export const Header: React.FC<CharacterProps> = ({ character }) => {







    return (
        <section className="create-header">
            <div className="name">
                <h1 id="name" title="Name"><input type="text" autoComplete="off" className="create-char-name" placeholder="Name" name="char-name" id="char-name" value={character.name} onChange={(e) => character.setName(e.target.value)} /></h1>
            </div>
            <div className="classes">
                {<CharacterInfo character={character} />}


            </div>
            <StatHeaders character={character} />
        </section>


    );
}