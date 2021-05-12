import { useRef } from "react";
import { iCharacter } from "../models/character";

interface SaveUploadCharacterProps {
    character: iCharacter
}
export const SaveUploadCharacter: React.FC<SaveUploadCharacterProps> = ({ character }) => {
    const handleSaveClick = () => {
        const characterData = JSON.stringify(character.serialize());
        const element = document.createElement("a");
        const file = new Blob([characterData], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = `character-${character.name}.json`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

    }



    const handleLoadClick: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        if (!file) return;
        const read = new FileReader();

        read.readAsBinaryString(file);

        read.onloadend = function () {
            if (typeof read.result === "string") {
                const char = JSON.parse(read.result);
                character.deserialize(char);
            }
        }
    }


    const inputRef = useRef<HTMLInputElement>(null);
    const clickInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }


    return (
        <div className="upload">
            <button onClick={() => handleSaveClick()}>Save</button>
            <input type="file" ref={inputRef} onChange={handleLoadClick} hidden />
            <button onClick={() => clickInput()}>Load</button>
        </div>
    );
}