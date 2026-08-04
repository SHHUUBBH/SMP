import "./components.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        "ui-button",
        `ui-button-${variant}`,
        `ui-button-${size}`,
        fullWidth && "ui-button-full",
        loading && "ui-button-loading",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? (
        <span className="ui-spinner"></span>
      ) : (
        <>
          {icon && (
            <span className="ui-button-icon">
              {icon}
            </span>
          )}

          <span>{children}</span>
        </>
      )}
    </button>
  );
}