import "./ProgressBar.css";

export default function ProgressBar({

    value = 0,

    max = 100,

    showValue = true,

    color = "red",

    size = "md",

    label,

}) {

    const percentage = Math.min(
        Math.max((value / max) * 100, 0),
        100
    );

    return (

        <div className="progress-wrapper">

            {(label || showValue) && (

                <div className="progress-header">

                    {label && (

                        <span className="progress-label">

                            {label}

                        </span>

                    )}

                    {showValue && (

                        <span className="progress-value">

                            {Math.round(percentage)}%

                        </span>

                    )}

                </div>

            )}

            <div className={`progress-track ${size}`}>

                <div

                    className={`progress-fill ${color}`}

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

        </div>

    );

}