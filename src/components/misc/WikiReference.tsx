interface WikiReferenceProps {
    href: string
    title?: string;
}
export const WikiReference: React.FC<WikiReferenceProps> = ({ href, title }) => {
    return <a href={href} target="_blank" rel="noreferrer noopener"><i title={title || "Wiki Reference"} className="far fa-question-circle info hoverable"></i></a>;
}