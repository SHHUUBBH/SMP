import "./Textarea.css";

export default function Textarea({

    label,

    error,

    helper,

    rows = 5,

    resize = "vertical",

    className = "",

    ...props

}){

    return(

        <div className={`ui-textarea-wrapper ${className}`}>

            {label && (

                <label className="ui-textarea-label">

                    {label}

                </label>

            )}

            <textarea

                rows={rows}

                className={`ui-textarea ${error ? "error" : ""}`}

                className={`ui-textarea resize-${resize} ${error ? "error" : ""}`}

                {...props}

            />

            {error ? (

                <span className="ui-textarea-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="ui-textarea-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}