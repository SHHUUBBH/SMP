import { useState } from "react";

export default function TicketManagement() {
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("High");
  const [assigned, setAssigned] = useState("Administrator");
  const [category, setCategory] = useState("Purchase");

  return (
    <div className="panel">
      <h2>Ticket Management</h2>

      <div className="form-grid">

        <div className="form-group">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Open</option>
            <option>Pending</option>
            <option>Waiting for Player</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label>Assigned To</label>
          <select
            value={assigned}
            onChange={(e) => setAssigned(e.target.value)}
          >
            <option>Unassigned</option>
            <option>Administrator</option>
            <option>Owner</option>
            <option>Senior Moderator</option>
            <option>Moderator</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Purchase</option>
            <option>Rank Issue</option>
            <option>Bug Report</option>
            <option>Appeal</option>
            <option>General Support</option>
          </select>
        </div>

      </div>

      <button className="btn btn-primary">
        Save Changes
      </button>
    </div>
  );
}