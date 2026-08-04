import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import "./PasswordInput.css";

export default function PasswordInput({

    label,

    error,

    helper,

    className = "",

    ...props

}){

    const [visible,setVisible] = useState(false);

    return(

        <div className={`password-wrapper ${className}`}>

            {label && (

                <label className="password-label">

                    {label}

                </label>

            )}

            <div className={`password-container ${error ? "error" : ""}`}>

                <input

                    type={visible ? "text" : "password"}

                    className="password-input"

                    {...props}

                />

                <button

                    type="button"

                    className="password-toggle"

                    onClick={() => setVisible(!visible)}

                >

                    {visible ?

                        <EyeOff size={18}/>

                        :

                        <Eye size={18}/>

                    }

                </button>

            </div>

            {error ? (

                <span className="password-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="password-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}