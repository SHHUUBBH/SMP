import { X } from "lucide-react";
import "./components.css";

export default function Modal({
    open,
    onClose,
    title,
    subtitle,
    children,
    footer,
    size = "md",
}) {

    if (!open) return null;

    return (

        <div
            className="ui-modal-overlay"
            onClick={onClose}
        >

            <div
                className={`ui-modal ui-modal-${size}`}
                onClick={(e) => e.stopPropagation()}
            >

                <div className="ui-modal-header">

                    <div>

                        <h2>{title}</h2>

                        {subtitle && (
                            <p>{subtitle}</p>
                        )}

                    </div>

                    <button
                        className="ui-modal-close"
                        onClick={onClose}
                    >

                        <X size={18} />

                    </button>

                </div>

                <div className="ui-modal-body">

                    {children}

                </div>

                {footer && (

                    <div className="ui-modal-footer">

                        {footer}

                    </div>

                )}

            </div>

        </div>

    );

}