import { CharacterProps } from ".";
import { Section } from "./Section";

export const CharacterDescription: React.FC<CharacterProps> = ({ character }) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        character.setDescription((oldDesc) => ({ ...oldDesc, [name]: value }));
        console.log(character.description);
    }

    const renderInputs = (): JSX.Element[] => {
        const els: JSX.Element[] = [];
        const placeholderMap: { [key: string]: string } = {
            age: '50',
            weight: '110lbs',
            skin: 'Grey',
            height: `6'4"`,
            eyes: 'Green',
            hair: 'Brown'
        }
        for (let key in character.description) {
            els.push(
                <div className="center-grid-justified">
                    <div className="left">
                        <label htmlFor={key}>{`${key.substr(0, 1).toUpperCase()}${key.substr(1).toLowerCase()}`}: </label>
                    </div>
                    <div className="right">
                        <input type="text" name={key} id={key} placeholder={placeholderMap[key]} value={character.description[key]} onChange={handleChange} />
                    </div>
                </div>
            )
        }
        return els;
    }


    return (
        <Section wikiReference="https://da-dd.fandom.com/wiki/Creating_a_Character" id="character-description" title="Description" header="Description" icon="fas fa-binoculars">
            <div className="create-description-inputs">
                {renderInputs()}
            </div>
        </Section>
    );
}