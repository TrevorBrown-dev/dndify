import { useRef } from "react";
import { iCharacter } from "../../models/character";

interface HeartContainerProps {
    character: iCharacter;
    size?: string;

}
export const HeartContainer: React.FC<HeartContainerProps> = ({ character, size }) => {
    const onHPChange = (value: number) => {
        character.setHP(value);
    }
    const ref = useRef<HTMLInputElement>(null);
    const focusInput = () => {
        ref.current?.focus();
    }
    return (
        <div className="hp-heart-container" style={{ fontSize: size || '5em' }} onClick={(e) => focusInput()}>
            <div className="hp-heart-content hoverable color-primary-hover">
                <div className="label">
                    <span>HP</span>
                </div>
                <div>

                    <div className="heart">
                        <i className="far fa-heart"></i>
                    </div>
                    <div className="input">
                        <input type="number" ref={ref} placeholder="-" min="0" value={character.hp || ""} className="hp-input" onChange={(e) => onHPChange(Math.abs(parseInt(e.target.value)))} />
                    </div>
                </div>
            </div>
        </div>
    );
}