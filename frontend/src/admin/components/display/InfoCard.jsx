import "./InfoCard.css";

export default function InfoCard({

    title,

    subtitle,

    children,

    actions,

}) {

    return (

        <div className="info-card">

            {(title || actions) && (

                <div className="info-card-header">

                    <div>

                        {title && (

                            <h3>{title}</h3>

                        )}

                        {subtitle && (

                            <p>{subtitle}</p>

                        )}

                    </div>

                    {actions && (

                        <div className="info-card-actions">

                            {actions}

                        </div>

                    )}

                </div>

            )}

            <div className="info-card-body">

                {children}

            </div>

        </div>

    );

}