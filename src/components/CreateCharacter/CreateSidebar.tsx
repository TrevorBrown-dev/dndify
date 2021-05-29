import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar";

export const CreateSidebar: React.FC = () => {
    const [links, setLinks] = useState<JSX.Element[]>();
    const [elements, setElements] = useState<NodeListOf<HTMLHeadingElement>>();
    useEffect(() => {
        setElements(document.querySelectorAll('h1'));
    }, [])
    useEffect(() => {
        if (!elements) return;
        const l: [string, string][] = [];
        elements.forEach(({ id, title }) => l.push([id, title]));

        setLinks(l.map(([id, title]) => {
            const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
                const el = document.getElementById(id);
                el?.scrollIntoView();
            }
            return (
                <a onClick={handleClick} key={`hlink-${id}`}>
                    <div className="create-sidebar-link">
                        {title}
                    </div>
                </a>
            );
        }))
    }, [elements])
    return (
        <Sidebar>
            <Link to="/">
                <button className="back-button"><i className="fas fa-angle-double-left"></i></button>
            </Link>
            <div className="header-links">
                {links}

            </div>
        </Sidebar>
    );
}