import { CharacterProps } from ".";
import { HeartContainer } from "../misc/HeartContainer";
import { Section } from "./Section";

export const Health: React.FC<CharacterProps> = ({ character }) => {
    return (
        <Section id="health" title="Health" header="Health" icon="fas fa-heart" wikiReference="https://dungeonsdragons.fandom.com/wiki/Hit_points">
            <HeartContainer character={character} size="2em" />
        </Section>
    );
}