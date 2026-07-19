import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Editor from "../components/Editor";
import UploadFile from "../components/UploadFile";
import ShareDocument from "../components/ShareDocument";
import "../styles/editor.css";

function DocumentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Protect page
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // Load document
  useEffect(() => {
    loadDocument();
  }, []);

  const loadDocument = async () => {
    try {
      const res = await api.get("/documents");

      const doc = res.data.find((d) => d.id === Number(id));

      if (doc) {
        setTitle(doc.title);
        setContent(doc.content);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = (data) => {
    setTitle(data.title);
    setContent(data.content);
  };

  const saveDocument = async () => {
    try {
      await api.put(`/documents/${id}`, {
        title,
        content,
      });

      alert("Document saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save document.");
    }
  };

  return (
    <div className="editor-page">
      <div className="editor-container">
        <div className="editor-header">
          <div>
            <button
              className="back-btn"
              onClick={() => navigate("/dashboard")}
            >
              ← Back to Dashboard
            </button>

            <h1 className="editor-title">📄 Document Editor</h1>
          </div>

          <button className="save-btn" onClick={saveDocument}>
            💾 Save
          </button>
        </div>

        <input
          className="title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title"
        />

        <div className="editor-actions">
          <div className="action-card">
            <h3>📂 Upload File</h3>
            <UploadFile onUpload={handleUpload} />
          </div>

          <div className="action-card">
            <h3>👥 Share Document</h3>
            <ShareDocument documentId={Number(id)} />
          </div>
        </div>

        <Editor
          content={content}
          setContent={setContent}
        />
      </div>
    </div>
  );
}

export default DocumentEditor;