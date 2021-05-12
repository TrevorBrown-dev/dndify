import React, { useEffect, useState } from "react";
import { LinkedHeader } from "../misc/LinkedHeader";
import { WikiReference } from "../misc/WikiReference";

export const CreateCharacterHitDice: React.FC = () => {
    const [diceVal, setDiceVal] = useState(0);
    const [diceIcon, setDiceIcon] = useState("fas fa-dice-d20");

    useEffect(() => {
        switch (diceVal) {
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
            case 20:
                setDiceIcon(`fas fa-dice-d${diceVal}`);
                break;
            default:
                setDiceIcon("fas fa-dice-d20");
                break;
        }
    }, [diceVal, setDiceIcon])

    return (
        <div className="create-header create-dice">
            <LinkedHeader id="hitdice" >
                <i className={`${diceIcon}`} style={{ marginRight: '1em' }}></i>Hit Dice
            </LinkedHeader>
            <WikiReference href="https://dungeonsdragons.fandom.com/wiki/Hit_dice" />
            <div className="create-body" style={{ fontSize: "1.6em" }}>
                <div>
                    <input type="number" className="hit-dice-input" style={{ textAlign: 'right', paddingRight: '.1em' }} placeholder="2" />d
                    <input type="number" className="hit-dice-input" style={{ textAlign: 'left', paddingLeft: '.1em' }} placeholder="6" onChange={(e) => setDiceVal(parseInt(e.target.value))} />
                    <div style={{ textAlign: 'center', display: "flex", marginTop: '0.7em' }}>

                        <i className="fas fa-heart hp-icon hoverable" style={{ flex: '1' }}></i><input type="number" placeholder="HP" className="hp-input" />
                    </div>

                </div>
            </div>
        </div>
    );
}