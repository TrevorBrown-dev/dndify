import { CharacterProps } from ".";
import { Section } from "./Section";

export const CharacterDescription: React.FC<CharacterProps> = ({ character }) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        character.setDescription((oldDesc) => ({ ...oldDesc, [name]: value }));
        console.log(character.description);
    }

    return (
        <Section wikiReference="https://da-dd.fandom.com/wiki/Creating_a_Character" id="character-description" title="Description" header="Description" icon="fas fa-binoculars">
            <div className="create-description-inputs">
                <div className="center-grid-justified">
                    <div className="left">
                        <label htmlFor="age">Age: </label>
                    </div>
                    <div className="right">
                        <input type="text" name="age" id="age" placeholder="50" onChange={handleChange} />
                    </div>
                </div>
                <div className="center-grid-justified">
                    <div className="left">
                        <label htmlFor="height">Height: </label>
                    </div>
                    <div className="right">
                        <input type="text" name="height" id="height" placeholder={`6'5"`} onChange={handleChange} />
                    </div>

                </div>

                <div className="center-grid-justified">
                    <div className="left">
                        <label htmlFor="weight">Weight: </label>
                    </div>
                    <div className="right">
                        <input type="text" name="weight" id="weight" onChange={handleChange} placeholder="110lbs" />
                    </div>
                </div>

                <div className="center-grid-justified">
                    <div className="left">
                        <label htmlFor="eyes">Eyes: </label>
                    </div>
                    <div className="right">
                        <input type="text" name="eyes" id="eyes" onChange={handleChange} placeholder="Green" />
                    </div>
                </div>

                <div className="center-grid-justified">
                    <div className="left"><label htmlFor="skin">Skin: </label></div>
                    <div className="right">

                        <input type="text" name="skin" id="skin" onChange={handleChange} placeholder="Gray" />
                    </div>
                </div>

                <div className="center-grid-justified">
                    <div className="left"><label htmlFor="hair">Hair: </label></div>
                    <div className="right">

                        <input type="text" name="hair" id="hair" onChange={handleChange} placeholder="Brown" />
                    </div>
                </div>
            </div>
        </Section>
    );
}