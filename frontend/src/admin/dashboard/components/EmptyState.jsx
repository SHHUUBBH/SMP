import { Inbox } from "lucide-react";
import Button from "./Button";
import "./components.css";

export default function EmptyState({
    icon,
    title = "Nothing here yet",
    description = "There isn't anything to display.",
    buttonText,
    onButtonClick,
}) {

    const Icon = icon || Inbox;

    return (

        <div className="empty-state">

            <div className="empty-state-icon">

                <Icon size={56} />

            </div>

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

            {buttonText && (

                <Button
                    onClick={onButtonClick}
                >

                    {buttonText}

                </Button>

            )}

        </div>

    );

}