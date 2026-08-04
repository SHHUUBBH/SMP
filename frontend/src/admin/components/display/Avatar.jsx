import { useState } from "react";
import "./Avatar.css";

export default function Avatar({

    src,

    name = "User",

    size = "md",

    status,

    rounded = true,

}) {

    const [error, setError] = useState(false);

    const initials = name
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (

        <div
            className={`avatar avatar-${size} ${rounded ? "rounded" : ""}`}
        >

            {!error && src ? (

                <img
                    src={src}
                    alt={name}
                    onError={() => setError(true)}
                />

            ) : (

                <span className="avatar-initials">

                    {initials}

                </span>

            )}

            {status && (

                <span
                    className={`avatar-status ${status}`}
                />

            )}

        </div>

    );

}