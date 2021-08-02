import { useRef } from 'react';
import { iCharacter } from '../models/character';
import { SlidingIconButton } from './misc/SlidingIconButton';

interface SaveUploadCharacterProps {
    character: iCharacter;
}
export const SaveUploadCharacter: React.FC<SaveUploadCharacterProps> = ({ character }) => {
    const handleSaveClick = () => {
        const characterData = JSON.stringify(character.serialize());
        const element = document.createElement('a');
        const file = new Blob([characterData], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = `character-${character.name}.json`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    const handleLoadClick: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        if (!file) return;
        const read = new FileReader();

        read.readAsBinaryString(file);

        read.onloadend = function () {
            if (typeof read.result === 'string') {
                const char = JSON.parse(read.result);
                character.deserialize(char);
            }
        };
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const clickInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className='upload'>
            <input type='file' ref={inputRef} onChange={handleLoadClick} hidden />
            <SlidingIconButton icon='fas fa-save' className='hoverable color-off-primary-hover color-off-light reduced' onClick={() => handleSaveClick()} title='Save Character'>
                Save
            </SlidingIconButton>
            <SlidingIconButton icon='fas fa-file-export' className='hoverable color-off-primary-hover color-off-light reduced' onClick={() => clickInput()} title='Load Character'>
                Load
            </SlidingIconButton>
            {/* <i className='fas fa-save hoverable color-off-primary-hover color-off-light' title='Save Character' onClick={() => handleSaveClick()}></i> */}
            {/* <i className='fas fa-file-export hoverable color-off-primary-hover color-off-light' title='Load Character' onClick={() => clickInput()}></i> */}
        </div>
    );
};
