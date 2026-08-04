import "./MetricGrid.css";

export default function MetricGrid({

    children,

    columns = 4,

}){

    return(

        <div
            className={`metric-grid cols-${columns}`}
        >

            {children}

        </div>

    );

}