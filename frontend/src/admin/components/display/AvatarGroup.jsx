import Avatar from "./Avatar";
import "./AvatarGroup.css";

export default function AvatarGroup({

    users = [],

    max = 4,

    size = "md",

}) {

    const visibleUsers = users.slice(0, max);

    const remaining = users.length - max;

    return (

        <div className="avatar-group">

            {visibleUsers.map((user, index) => (

                <div
                    key={user.id || index}
                    className="avatar-group-item"
                    style={{ zIndex: visibleUsers.length - index }}
                >

                    <Avatar
                        src={user.src}
                        name={user.name}
                        status={user.status}
                        size={size}
                    />

                </div>

            ))}

            {remaining > 0 && (

                <div
                    className="avatar-group-more"
                    style={{ zIndex: 0 }}
                >

                    +{remaining}

                </div>

            )}

        </div>

    );

}