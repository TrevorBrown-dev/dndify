import { useEffect } from "react";
import { CharacterProps } from ".";
import { Section } from "./Section";

export const Alignment: React.FC<CharacterProps> = ({ character }) => {
    useEffect(() => {
        document.querySelectorAll('.create-alignment .alignment').forEach(el => {
            if (el.textContent?.toLowerCase() === character.alignment.toLowerCase()) {
                el.classList.add('active');
            } else el.classList.remove('active');
        }, [character.alignment]);
    })
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        const target = event.currentTarget;
        const content = target.textContent;
        if (!content) return;
        character.setAlignment((oldContent) => (oldContent === content) ? "" : content);

    }
    return (
        <Section header="Alignment" icon="fas fa-eclipse" id="aligment" title="Alignment" wikiReference="https://dnd5e.info/beyond-1st-level/alignment/">
            <div className="create-alignment">
                <div className="alignment" onClick={handleClick}>Lawful Good</div>
                <div className="alignment" onClick={handleClick}>Neutral Good</div>
                <div className="alignment" onClick={handleClick}>Chaotic Good</div>

                <div className="alignment" onClick={handleClick}>Lawful Neutral</div>
                <div className="alignment" onClick={handleClick}>True Neutral</div>
                <div className="alignment" onClick={handleClick}>Chaotic Neutral</div>

                <div className="alignment" onClick={handleClick}>Lawful Evil</div>
                <div className="alignment" onClick={handleClick}>Neutral Evil</div>
                <div className="alignment" onClick={handleClick}>Chaotic Evil</div>
            </div>
        </Section>
    );
}