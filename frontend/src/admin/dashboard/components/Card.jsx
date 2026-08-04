export default function Card({
    title,
    subtitle,
    children,
    actions,
    className = ""
}) {

    return (

        <div className={`ui-card ${className}`}>

            {(title || subtitle || actions) && (

                <div className="ui-card-header">

                    <div>

                        {title && (
                            <h3>{title}</h3>
                        )}

                        {subtitle && (
                            <p>{subtitle}</p>
                        )}

                    </div>

                    {actions && (
                        <div className="ui-card-actions">
                            {actions}
                        </div>
                    )}

                </div>

            )}

            <div className="ui-card-body">

                {children}

            </div>

        </div>

    );

}