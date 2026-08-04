import { Minus, Plus } from "lucide-react";
import "./NumberInput.css";

export default function NumberInput({

    label,

    helper,

    error,

    value = 0,

    min,

    max,

    step = 1,

    onChange,

    className = "",

}){

    const update = (next) => {

        let newValue = next;

        if (min !== undefined) newValue = Math.max(min, newValue);
        if (max !== undefined) newValue = Math.min(max, newValue);

        onChange?.(newValue);

    };

    return(

        <div className={`ui-number-wrapper ${className}`}>

            {label && (

                <label className="ui-number-label">

                    {label}

                </label>

            )}

            <div className={`ui-number-container ${error ? "error" : ""}`}>

                <button
                    type="button"
                    className="ui-number-btn"
                    onClick={() => update(value - step)}
                >

                    <Minus size={16}/>

                </button>

                <input

                    type="number"

                    className="ui-number-input"

                    value={value}

                    min={min}

                    max={max}

                    step={step}

                    onChange={(e)=>update(Number(e.target.value))}

                />

                <button
                    type="button"
                    className="ui-number-btn"
                    onClick={() => update(value + step)}
                >

                    <Plus size={16}/>

                </button>

            </div>

            {error ? (

                <span className="ui-number-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="ui-number-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}