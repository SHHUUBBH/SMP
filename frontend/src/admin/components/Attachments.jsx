import { useRef, useState } from "react";

export default function Attachments() {
  const fileInput = useRef(null);

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "purchase_receipt.png",
      size: "482 KB",
      uploadedBy: "Dhruv",
    },
    {
      id: 2,
      name: "latest.log",
      size: "124 KB",
      uploadedBy: "Administrator",
    },
  ]);

  const handleFiles = (selected) => {
    const uploaded = Array.from(selected).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      uploadedBy: "Administrator",
    }));

    setFiles((prev) => [...prev, ...uploaded]);
  };

  return (
    <div className="panel">
      <h2>Attachments</h2>

      <div
        className="upload-box"
        onClick={() => fileInput.current.click()}
      >
        <h3>📎 Upload Files</h3>

        <p>
          Click here or drag & drop screenshots,
          logs, PDFs or ZIP files.
        </p>

        <input
          hidden
          multiple
          ref={fileInput}
          type="file"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="attachments-list">
        {files.map((file) => (
          <div
            key={file.id}
            className="attachment-card"
          >
            <div>
              <strong>{file.name}</strong>

              <p>
                {file.size} • Uploaded by {file.uploadedBy}
              </p>
            </div>

            <div className="attachment-actions">
              <button className="btn btn-outline compact">
                Download
              </button>

              <button className="btn btn-danger compact">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}