import { useState } from "react";

export default function InternalNotes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      author: "Administrator",
      time: "28 Jul 2026 • 10:32",
      text: "Purchase verified in payment gateway. Waiting for console delivery.",
    },
    {
      id: 2,
      author: "Moderator",
      time: "28 Jul 2026 • 10:36",
      text: "LuckPerms didn't execute. Will grant rank manually if retry fails.",
    },
  ]);

  const [text, setText] = useState("");

  const addNote = () => {
    if (!text.trim()) return;

    setNotes([
      ...notes,
      {
        id: Date.now(),
        author: "Administrator",
        time: new Date().toLocaleString(),
        text,
      },
    ]);

    setText("");
  };

  return (
    <div className="panel">
      <h2>Internal Staff Notes</h2>

      <div className="notes-list">
        {notes.map((note) => (
          <div className="staff-note" key={note.id}>
            <div className="note-header">
              <strong>{note.author}</strong>
              <span>{note.time}</span>
            </div>

            <p>{note.text}</p>
          </div>
        ))}
      </div>

      <textarea
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add an internal note..."
      />

      <button
        className="btn btn-primary"
        onClick={addNote}
      >
        Save Note
      </button>
    </div>
  );
}