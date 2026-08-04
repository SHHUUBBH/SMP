import "./components.css";

export default function Badge({
    children,
    variant = "default",
    size = "md",
}) {
    return (
        <span
            className={[
                "ui-badge",
                `ui-badge-${variant}`,
                `ui-badge-${size}`,
            ].join(" ")}
        >
            {children}
        </span>
    );
}