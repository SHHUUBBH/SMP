import "./Radio.css";

export default function Radio({

    label,

    helper,

    error,

    checked,

    disabled = false,

    className = "",

    ...props

}){

    return(

        <div className={`ui-radio-wrapper ${className}`}>

            <label
                className={`ui-radio-label ${disabled ? "disabled" : ""}`}
            >

                <input

                    type="radio"

                    checked={checked}

                    disabled={disabled}

                    {...props}

                />

                <span className="ui-radio-circle">

                    <span className="ui-radio-dot" />

                </span>

                {label && (

                    <span className="ui-radio-text">

                        {label}

                    </span>

                )}

            </label>

            {error ? (

                <span className="ui-radio-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="ui-radio-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}