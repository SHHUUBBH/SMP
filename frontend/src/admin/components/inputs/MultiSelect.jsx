import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import "./MultiSelect.css";

export default function MultiSelect({

    label,

    options = [],

    value = [],

    onChange,

    placeholder = "Select...",

    helper,

    error,

}){

    const [open,setOpen]=useState(false);

    const toggle=(option)=>{

        const exists=value.includes(option.value);

        const updated=exists
            ? value.filter(v=>v!==option.value)
            : [...value,option.value];

        onChange?.(updated);
    };

    return(

        <div className="multi-select">

            {label && (

                <label className="multi-label">

                    {label}

                </label>

            )}

            <div
                className={`multi-control ${error?"error":""}`}
                onClick={()=>setOpen(!open)}
            >

                <div className="multi-values">

                    {value.length===0 && (

                        <span className="multi-placeholder">

                            {placeholder}

                        </span>

                    )}

                    {value.map(val=>{

                        const option=options.find(o=>o.value===val);

                        if(!option) return null;

                        return(

                            <span
                                key={val}
                                className="multi-chip"
                            >

                                {option.label}

                                <X

                                    size={14}

                                    onClick={(e)=>{

                                        e.stopPropagation();

                                        toggle(option);

                                    }}

                                />

                            </span>

                        );

                    })}

                </div>

                <ChevronDown
                    size={18}
                    className={`multi-arrow ${open?"open":""}`}
                />

            </div>

            {open && (

                <div className="multi-dropdown">

                    {options.map(option=>(

                        <button

                            key={option.value}

                            type="button"

                            className={`multi-option ${
                                value.includes(option.value)
                                    ? "selected"
                                    : ""
                            }`}

                            onClick={()=>toggle(option)}

                        >

                            {option.label}

                        </button>

                    ))}

                </div>

            )}

            {error ? (

                <span className="multi-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="multi-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}