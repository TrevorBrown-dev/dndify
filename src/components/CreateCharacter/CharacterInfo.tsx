import { CharacterProps } from ".";
interface CharacterInfoProps extends CharacterProps {
    className?: string;
    style?: React.CSSProperties;
}
export const CharacterInfo: React.FC<CharacterInfoProps> = ({ character, className, style }) => {
    const renderInfo = () => {
        const { classes } = character.classes;
        const { race } = character;
        const the = () => (classes.length !== 0 || race.length !== 0) ? "The" : "";
        const hyphen = () => (classes.length !== 0 && race.length !== 0) ? "-" : "";

        const mapClasses = (() => {
            return classes.map((c, index) => {
                return (
                    <span key={`header-class-${index}`}>
                        {c.name} {c.level ? <sub className="create-level-sub">{c.level}</sub> : ""}{index < classes.length - 1 ? ", " : ""}
                    </span>
                );
            })
        })
        return (
            <div className={className} style={style}>
                {the()} <span>{race}</span> {hyphen()} <span>{mapClasses()}</span>
            </div>
        );
    }
    return (renderInfo());
}