interface LinkedHeaderProps {
    children: React.ReactNode,
    id: string
}

export const LinkedHeader: React.FC<LinkedHeaderProps> = ({ id, children }) => {
    return (
        <h1 id={id} style={{ display: "inline-block" }}>
            <a href={`#${id}`} aria-label={`${id} permalink`}>
                {children || ""}
            </a>
        </h1>
    );
}
