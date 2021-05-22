import React from "react";
import { CharacterProps } from ".";
import { Section } from "./Section";

export const HitDice: React.FC<CharacterProps> = ({ character }) => {
    //Map over classes, for each class, render a hit dice row
    const renderHitDiceInputs = (): JSX.Element[] => {
        const { classes } = character.classes;
        return classes.map(c => {
            return (
                <div className="center-grid-justified" key={`hd-container-${c.name}`}>
                    <div className="left">
                        <label htmlFor={`hd-level-${c.name}`}>{c.name}: </label>
                    </div>

                    <div className="right">
                        <input type="number" id={`hd-dice-${c.name}`} className="hit-dice-input" style={{ textAlign: 'right', paddingRight: '.15em' }} placeholder="LV" min="1"
                            value={c.level}
                            onChange={(e) => character.classes.setLevel(c.name, parseInt(e.target.value))}
                        />d
                            <input type="number" className="hit-dice-input"
                            style={{ textAlign: 'left', paddingLeft: '.15em' }}
                            placeholder="HD" min="0"
                            value={c.hitDice || ""}
                            onChange={(e) => character.classes.setDice(c.name, parseInt(e.target.value))} />
                    </div>
                </div>
            );
        })
    }


    return (
        <Section id="dice" title="Hit Dice" header="Hit Dice" icon="fa fa-dice-d20" wikiReference="https://dungeonsdragons.fandom.com/wiki/Hit_dice">
            <div style={{ fontSize: "1.6em" }}>
                {renderHitDiceInputs()}
            </div>
        </Section>
    );
}