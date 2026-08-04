import "./Checkbox.css";

export default function Checkbox({

    label,

    helper,

    error,

    checked,

    disabled = false,

    className = "",

    ...props

}){

    return(

        <div className={`ui-checkbox-wrapper ${className}`}>

            <label
                className={`ui-checkbox-label ${disabled ? "disabled" : ""}`}
            >

                <input

                    type="checkbox"

                    checked={checked}

                    disabled={disabled}

                    {...props}

                />

                <span className="ui-checkbox-box">

                    <svg
                        viewBox="0 0 24 24"
                        className="ui-checkbox-check"
                    >

                        <path
                            d="M20 6L9 17L4 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                    </svg>

                </span>

                {label && (

                    <span className="ui-checkbox-text">

                        {label}

                    </span>

                )}

            </label>

            {error ? (

                <span className="ui-checkbox-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="ui-checkbox-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}