import { ChevronDown } from "lucide-react";
import "./Select.css";

export default function Select({

    label,

    helper,

    error,

    options = [],

    className = "",

    ...props

}){

    return(

        <div className={`ui-select-wrapper ${className}`}>

            {label && (

                <label className="ui-select-label">

                    {label}

                </label>

            )}

            <div className={`ui-select-container ${error ? "error" : ""}`}>

                <select

                    className="ui-select"

                    {...props}

                >

                    {options.map((option)=>(

                        <option

                            key={option.value}

                            value={option.value}

                        >

                            {option.label}

                        </option>

                    ))}

                </select>

                <ChevronDown
                    size={18}
                    className="ui-select-icon"
                />

            </div>

            {error ? (

                <span className="ui-select-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="ui-select-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}