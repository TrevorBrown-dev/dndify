import { CharacterProps } from ".";
import { Section } from "./Section";
import MDEditor from '@uiw/react-md-editor';

export const Backstory: React.FC<CharacterProps> = ({ character }) => {

    return (
        <Section header="Backstory" title="Backstory" id="backstory" icon="fas fa-book" wikiReference="https://arcaneeye.com/dm-tools-5e/dnd-character-backstory-template/">
            <div className="sec-backstory center-content">

                <p>Write your backstory here! You can use markdown syntax to make it look pretty!</p>
                <p>
                    <a href="https://www.markdownguide.org/basic-syntax/" className="color-primary">
                        Markdown Reference
                    </a>
                </p>

                <div className="md-container" style={{ width: '70%', overflow: 'hidden' }}>
                    <MDEditor value={character.backstory} hideToolbar={true} preview={"edit"}

                        textareaProps={
                            {
                                placeholder: '# In the Beginning...',
                                wrap: "hard",
                                style: { padding: 'inherit' }
                            }
                        }
                        onChange={(value) => character.setBackstory(value || "")}
                    />

                    <fieldset className="preview center-content" style={{ paddingTop: '0em' }}>
                        <legend><span>Preview</span></legend>
                        {(character.backstory === "") ? <div className="placeholder wmde-markdown"><h1>In the Beginning...</h1></div> : <MDEditor.Markdown source={character.backstory} />}
                    </fieldset>
                </div>

            </div>
        </Section >
    )
}