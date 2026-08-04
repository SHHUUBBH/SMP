import "./Timeline.css";

export default function Timeline({

    items = [],

}){

    return(

        <div className="timeline">

            {items.map((item,index)=>(

                <div
                    className="timeline-item"
                    key={index}
                >

                    <div className="timeline-marker">

                        <span
                            className={`timeline-dot ${item.type || "default"}`}
                        />

                        {index !== items.length-1 && (

                            <span className="timeline-line" />

                        )}

                    </div>

                    <div className="timeline-content">

                        <div className="timeline-header">

                            <h4>

                                {item.title}

                            </h4>

                            <span>

                                {item.time}

                            </span>

                        </div>

                        {item.description && (

                            <p>

                                {item.description}

                            </p>

                        )}

                    </div>

                </div>

            ))}

        </div>

    );

}