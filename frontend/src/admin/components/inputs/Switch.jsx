import "./Switch.css";

export default function Switch({

    label,

    helper,

    error,

    checked,

    disabled = false,

    className = "",

    ...props

}){

    return(

        <div className={`ui-switch-wrapper ${className}`}>

            <label
                className={`ui-switch-label ${disabled ? "disabled" : ""}`}
            >

                <input

                    type="checkbox"

                    checked={checked}

                    disabled={disabled}

                    {...props}

                />

                <span className="ui-switch-slider">

                    <span className="ui-switch-thumb" />

                </span>

                <div className="ui-switch-content">

                    {label && (

                        <span className="ui-switch-title">

                            {label}

                        </span>

                    )}

                    {helper && (

                        <span className="ui-switch-helper">

                            {helper}

                        </span>

                    )}

                </div>

            </label>

            {error && (

                <span className="ui-switch-error">

                    {error}

                </span>

            )}

        </div>

    );

}