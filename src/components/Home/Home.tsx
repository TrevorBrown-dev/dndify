import React from "react";
import { Link } from "react-router-dom";
import { DnDAndSVG } from "../svg/DnDAndSVG";

export const Home: React.FC = () => {
    return (
        <div className="center-content" style={{ height: '100%' }}>
            <DnDAndSVG size="50vh" stroke="black" style={{ animationDuration: "1s" }} fill="#E40712" strokeWidth="0.5" />
            <div className="flex between" style={{ width: "40%" }}>
                <Link to="/create">
                    <button>
                        Create Character
                </button>
                </Link>
                <button>
                    Load Character
                </button>

            </div>
        </div>
    );
}