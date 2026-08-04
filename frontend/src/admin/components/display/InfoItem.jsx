import "./InfoCard.css";

export default function InfoItem({

    label,

    value,

}){

    return(

        <div className="info-item">

            <span className="info-label">

                {label}

            </span>

            <span className="info-value">

                {value}

            </span>

        </div>

    )

}