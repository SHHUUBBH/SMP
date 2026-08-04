export default function ActivityTimeline() {
  const events = [
    {
      id: 1,
      icon: "🎫",
      title: "Ticket Created",
      description: "Player created this support ticket.",
      by: "Dhruv",
      time: "28 Jul 2026 • 10:24",
    },
    {
      id: 2,
      icon: "👤",
      title: "Assigned",
      description: "Assigned to Administrator.",
      by: "System",
      time: "10:27",
    },
    {
      id: 3,
      icon: "💬",
      title: "Staff Reply",
      description: "Administrator replied to the player.",
      by: "Administrator",
      time: "10:31",
    },
    {
      id: 4,
      icon: "📝",
      title: "Internal Note",
      description: "Purchase verified in payment gateway.",
      by: "Administrator",
      time: "10:32",
    },
    {
      id: 5,
      icon: "🔄",
      title: "Status Changed",
      description: "Open → Pending",
      by: "Administrator",
      time: "10:34",
    },
  ];

  return (
    <div className="panel">
      <h2>Activity Timeline</h2>

      <div className="timeline">
        {events.map((event) => (
          <div className="timeline-item" key={event.id}>
            <div className="timeline-icon">
              {event.icon}
            </div>

            <div className="timeline-content">
              <h4>{event.title}</h4>

              <p>{event.description}</p>

              <small>
                {event.by} • {event.time}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}