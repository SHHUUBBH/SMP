import { Upload, File, X } from "lucide-react";
import { useRef } from "react";
import "./FileUpload.css";

export default function FileUpload({

    label,

    helper,

    error,

    file,

    onChange,

    accept,

    disabled = false,

}){

    const inputRef = useRef(null);

    const openPicker = () => {

        if(!disabled){

            inputRef.current?.click();

        }

    };

    const handleFile = (e)=>{

        const selected = e.target.files?.[0];

        if(selected){

            onChange?.(selected);

        }

    };

    return(

        <div className="upload-wrapper">

            {label && (

                <label className="upload-label">

                    {label}

                </label>

            )}

            <div

                className={`upload-box ${disabled ? "disabled" : ""}`}

                onClick={openPicker}

            >

                <Upload size={26}/>

                <h4>

                    Click to upload

                </h4>

                <p>

                    or drag & drop (coming soon)

                </p>

            </div>

            <input

                ref={inputRef}

                type="file"

                hidden

                accept={accept}

                onChange={handleFile}

            />

            {file && (

                <div className="upload-file">

                    <div className="upload-file-info">

                        <File size={18}/>

                        <span>

                            {file.name}

                        </span>

                    </div>

                    <button

                        type="button"

                        className="upload-remove"

                        onClick={()=>onChange?.(null)}

                    >

                        <X size={16}/>

                    </button>

                </div>

            )}

            {error ? (

                <span className="upload-error">

                    {error}

                </span>

            ) : helper ? (

                <span className="upload-helper">

                    {helper}

                </span>

            ) : null}

        </div>

    );

}