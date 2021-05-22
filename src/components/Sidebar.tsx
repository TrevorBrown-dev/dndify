import React from "react";

export const Sidebar: React.FC = (props) => {


    return (
        <div className="page-sidebar-container">
            <aside className="page-sidebar">
                {props.children}
            </aside>
        </div>
    );
}