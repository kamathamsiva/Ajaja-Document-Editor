import { useState } from "react";
import api from "../services/api";
import "../styles/components.css";

function UploadFile({ onUpload }) {
  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await api.post("/documents/upload", formData);

      onUpload(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept=".txt,.md"
        className="file-input"
        onChange={handleFile}
      />

      <button
        className="upload-btn"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
    </div>
  );
}

export default UploadFile;