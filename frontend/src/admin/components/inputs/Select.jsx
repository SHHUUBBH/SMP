import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import "./Select.css";

export default function Select({
    value,
    onChange,
    options = [],
    placeholder = "Select...",
    width = 220,
}) {

    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    useEffect(() => {

        function handleClick(event){

            if(ref.current && !ref.current.contains(event.target)){

                setOpen(false);

            }

        }

        window.addEventListener("mousedown",handleClick);

        return ()=>window.removeEventListener("mousedown",handleClick);

    },[]);

    const selected =
        options.find(option => option.value === value);

    return(

        <div
            ref={ref}
            className="ui-select"
            style={{width}}
        >

            <button
                className="ui-select-trigger"
                onClick={()=>setOpen(!open)}
            >

                <span>

                    {selected
                        ? selected.label
                        : placeholder}

                </span>

                <ChevronDown
                    size={18}
                    className={open ? "rotate" : ""}
                />

            </button>

            {open && (

                <div className="ui-select-menu">

                    {options.map(option=>(

                        <button

                            key={option.value}

                            className="ui-select-option"

                            onClick={()=>{

                                onChange(option.value);

                                setOpen(false);

                            }}

                        >

                            <span>

                                {option.label}

                            </span>

                            {value===option.value && (

                                <Check size={16}/>

                            )}

                        </button>

                    ))}

                </div>

            )}

        </div>

    )

}