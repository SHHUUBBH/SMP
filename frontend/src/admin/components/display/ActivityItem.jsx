import Avatar from "./Avatar";
import "./ActivityItem.css";

export default function ActivityItem({

    avatar,

    name,

    action,

    target,

    time,

    status,

}){

    return(

        <div className="activity-item">

            <Avatar

                src={avatar}

                name={name}

                size="sm"

                status={status}

            />

            <div className="activity-content">

                <div className="activity-text">

                    <strong>

                        {name}

                    </strong>

                    <span>

                        {" "}

                        {action}

                        {" "}

                    </span>

                    {target && (

                        <strong>

                            {target}

                        </strong>

                    )}

                </div>

                <div className="activity-time">

                    {time}

                </div>

            </div>

        </div>

    );

}