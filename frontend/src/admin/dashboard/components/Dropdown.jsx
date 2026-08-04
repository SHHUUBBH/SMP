import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import "./components.css";

export default function Dropdown({
    label,
    items = [],
    width = 220,
    align = "right",
}) {

    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    useEffect(() => {

        function handleClick(event) {

            if (ref.current && !ref.current.contains(event.target)) {

                setOpen(false);

            }

        }

        window.addEventListener("mousedown", handleClick);

        return () => window.removeEventListener("mousedown", handleClick);

    }, []);

    return (

        <div
            ref={ref}
            className="ui-dropdown"
        >

            <button
                className="ui-dropdown-trigger"
                onClick={() => setOpen(!open)}
            >

                <span>{label}</span>

                <ChevronDown
                    size={16}
                    className={open ? "rotate" : ""}
                />

            </button>

            {open && (

                <div
                    className={`ui-dropdown-menu ${align}`}
                    style={{ width }}
                >

                    {items.map((item) => (

                        <button
                            key={item.label}
                            className="ui-dropdown-item"
                            onClick={() => {

                                setOpen(false);

                                item.onClick?.();

                            }}
                        >

                            {item.icon && (

                                <span className="ui-dropdown-icon">

                                    {item.icon}

                                </span>

                            )}

                            <span>

                                {item.label}

                            </span>

                        </button>

                    ))}

                </div>

            )}

        </div>

    );

}