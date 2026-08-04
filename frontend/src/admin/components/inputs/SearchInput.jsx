import { Search, X } from "lucide-react";
import "./SearchInput.css";

export default function SearchInput({
    value = "",
    onChange,
    placeholder = "Search...",
    shortcut = "Ctrl + K",
    loading = false,
}) {

    return (

        <div className="search-input">

            <Search
                size={18}
                className="search-icon"
            />

            <input
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
            />

            {loading && (

                <div className="search-loading" />

            )}

            {!loading && value && (

                <button
                    className="search-clear"
                    onClick={() => onChange?.("")}
                >

                    <X size={16} />

                </button>

            )}

            {!loading && !value && shortcut && (

                <span className="search-shortcut">

                    {shortcut}

                </span>

            )}

        </div>

    );

}