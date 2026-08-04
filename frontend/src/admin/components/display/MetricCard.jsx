import "./MetricCard.css";

export default function MetricCard({

    title,

    value,

    change,

    icon,

    color = "red",

    footer,

    onClick,

}){

    return(

        <div
            className={`metric-card ${onClick ? "clickable" : ""}`}
            onClick={onClick}
        >

            <div className="metric-top">

                <div className={`metric-icon ${color}`}>

                    {icon}

                </div>

                {change && (

                    <span
                        className={`metric-change ${
                            change.startsWith("-")
                                ? "negative"
                                : "positive"
                        }`}
                    >

                        {change}

                    </span>

                )}

            </div>

            <div className="metric-body">

                <h2>

                    {value}

                </h2>

                <p>

                    {title}

                </p>

            </div>

            {footer && (

                <div className="metric-footer">

                    {footer}

                </div>

            )}

        </div>

    );

}