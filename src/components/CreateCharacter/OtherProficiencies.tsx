import React, { useEffect, useState } from "react";
import { CharacterProps } from ".";
import { CheckState, TripleCheckBox, TripleCheckBoxLegend } from "../misc/TripleCheckBox";
import { Section } from "./Section";

interface ProficiencyProps extends CharacterProps {
    name: string;
    onDelete: (name: string) => void;
}
const Proficiency: React.FC<ProficiencyProps> = ({ name, onDelete, character }) => {
    /* 
        TODO: I need to add observers to the checkboxes. These need to update the character model appropriately.
    */
    const { proficiencies } = character.otherProficiencies;
    const key = name;
    console.log(character);
    return (
        <div className="center-grid-justified">
            <div className="left">
                <div className="center-grid-justified">
                    <div className="left" style={{ marginRight: '1em' }}><TripleCheckBox id={`tp-${name}`}
                        value={proficiencies[key]?.proficiencyLevel as unknown as CheckState}
                        setValue={(value) => {
                            character.otherProficiencies.setProficiencyLevel(key, value);
                        }}
                    /></div>
                    <div className="right"><label htmlFor={`tp-${name}`} style={{ wordBreak: 'break-word', hyphens: 'auto' }}>{name}</label></div>
                </div>
            </div>

            <div className="right">
                <i className="fas fa-trash-alt hoverable color-primary-hover pointer" title="Add" onClick={() => { onDelete(name) }}></i>
            </div>
        </div>
    )
}

export const OtherProficiencies: React.FC<CharacterProps> = ({ character }) => {
    const [proficiencyText, setProficiencyText] = useState("");
    const [proficiencies, setProficiencies] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const { proficiencies } = character.otherProficiencies;
        const onDelete = (name: string) => {
            character.otherProficiencies.removeProficiency(name);
            setProficiencies((oldProfs => oldProfs.filter(oldName => oldName.key !== name)));
        }
        //rerender
        const els: JSX.Element[] = [];
        for (const key in proficiencies) {
            els.push(
                <Proficiency character={character} name={key} onDelete={onDelete} key={key} />
            )
        }
        setProficiencies(els);
        // // !I think I need to rework how profs get rendered for this to work

    }, [character, character.otherProficiencies, character.otherProficiencies.proficiencies])





    const handleChange = (value: string) => {
        if (value === "") return;
        character.otherProficiencies.addProficiency(value);
        //since we add to the character we can add a useeffect hook

        setProficiencyText("");
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            handleChange(proficiencyText);
        }

    }
    return (
        <Section id="other-proficiencies" icon="fas fa-toolbox" title="Other Proficiencies" header="Other Proficiencies" wikiReference="https://5thsrd.org/character/languages/">
            <div style={{ width: '100%', marginBottom: '2em' }}>
                <TripleCheckBoxLegend />
                <div className="add-other-proficiency">

                    <input type="text" placeholder="Elvish" value={proficiencyText} onChange={(e) => setProficiencyText(e.target.value)} onKeyDown={handleKeyDown} /><i className="far fa-plus-square hoverable-half color-primary-hover" onClick={() => handleChange(proficiencyText)} ></i>
                </div>
                <div className="other-proficiency-list">
                    {proficiencies}
                </div>
            </div>
        </Section>
    );
}