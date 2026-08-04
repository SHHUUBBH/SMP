import "./Input.css";

export default function Input({

    label,

    error,

    helper,

    leftIcon,

    rightIcon,

    className = "",

    ...props

}){

    return(

        <div className={`ui-input-wrapper ${className}`}>

            {label && (

                <label className="ui-input-label">

                    {label}

                </label>

            )}

            <div className={`ui-input-container ${error ? "error" : ""}`}>

                {leftIcon && (

                    <span className="ui-input-icon left">

                        {leftIcon}

                    </span>

                )}

                <input

                    className="ui-input"

                    {...props}

                />

                {rightIcon && (

                    <span className="ui-input-icon right">

                        {rightIcon}

                    </span>

                )}

            </div>

            {error ? (

                <span className="ui-input-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="ui-input-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}