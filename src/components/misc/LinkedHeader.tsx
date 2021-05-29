import { useRef } from "react";

interface LinkedHeaderProps {
    children: React.ReactNode;
    id: string;
    title?: string;
}

export const LinkedHeader: React.FC<LinkedHeaderProps> = ({ id, title, children }) => {
    const myRef = useRef<HTMLHeadingElement>(null);
    return (
        <h1 id={id} title={title || id} ref={myRef} style={{ display: "inline-block", userSelect: 'none', cursor: 'pointer' }} onClick={
            () => myRef?.current?.scrollIntoView()
        }>
            <a>
                {children || ""}
            </a>
        </h1 >
    );
}
