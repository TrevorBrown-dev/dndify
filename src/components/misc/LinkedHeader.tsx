interface LinkedHeaderProps {
    children: React.ReactNode;
    id: string;
    title?: string;
}

export const LinkedHeader: React.FC<LinkedHeaderProps> = ({ id, title, children }) => {
    return (
        <h1 id={id} title={title || id} style={{ display: "inline-block" }}>
            <a href={`#${id}`} aria-label={`${id} permalink`}>
                {children || ""}
            </a>
        </h1>
    );
}
