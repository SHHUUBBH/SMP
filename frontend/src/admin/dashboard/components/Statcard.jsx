import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import "./components.css";

export default function StatCard({
  title,
  value,
  change,
  positive = true,
  icon,
  footer,
}) {
  return (
    <div className="stat-card">

      <div className="stat-card-top">

        <div>

          <p className="stat-title">
            {title}
          </p>

          <h2 className="stat-value">
            {value}
          </h2>

        </div>

        <div className="stat-icon">
          {icon}
        </div>

      </div>

      <div className="stat-card-bottom">

        <div
          className={`stat-change ${
            positive
              ? "positive"
              : "negative"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          <span>{change}</span>
        </div>

        {footer && (
          <small className="stat-footer">
            {footer}
          </small>
        )}

      </div>

    </div>
  );
}