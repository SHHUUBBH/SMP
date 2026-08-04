import "./Section.css";

export default function Section({

    title,

    subtitle,

    actions,

    children,

    noPadding = false,

}){

    return(

        <section className="ui-section">

            {(title || actions) && (

                <div className="ui-section-header">

                    <div>

                        {title && (

                            <h2>{title}</h2>

                        )}

                        {subtitle && (

                            <p>{subtitle}</p>

                        )}

                    </div>

                    {actions && (

                        <div className="ui-section-actions">

                            {actions}

                        </div>

                    )}

                </div>

            )}

            <div className={`ui-section-body ${noPadding ? "no-padding" : ""}`}>

                {children}

            </div>

        </section>

    );

}