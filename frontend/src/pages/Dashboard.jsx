import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DocumentCard from "../components/DocumentCard";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/");
    }
    }, [navigate]);
  const [documents, setDocuments] = useState([]);
  const [sharedDocuments, setSharedDocuments] = useState([]);

  // Mock user (Alice = 1)
  const currentUserId = 1;

  useEffect(() => {
    loadDocuments();
    loadSharedDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const res = await api.get("/documents");

      const myDocs = res.data.filter(
        (doc) => doc.ownerId === currentUserId
      );

      setDocuments(myDocs);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSharedDocuments = async () => {
    try {
      const res = await api.get(
        `/documents/shared/${currentUserId}`
      );

      setSharedDocuments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createDocument = async () => {
    try {
      const res = await api.post("/documents", {
        title: "Untitled Document",
        content: "",
        ownerId: currentUserId,
      });

      navigate(`/editor/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create document.");
    }
  };

  const openDocument = (doc) => {
    navigate(`/editor/${doc.id}`);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1 className="dashboard-title">
            📄 Ajaja Document Editor
          </h1>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              className="new-doc-btn"
              onClick={createDocument}
            >
              + New Document
            </button>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="section-card">
          <h2 className="section-title">
            My Documents
          </h2>

          {documents.length === 0 ? (
            <p className="empty-text">
              No documents found.
            </p>
          ) : (
            documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onOpen={openDocument}
              />
            ))
          )}
        </div>

        <div className="section-card">
          <h2 className="section-title">
            Shared With Me
          </h2>

          {sharedDocuments.length === 0 ? (
            <p className="empty-text">
              No shared documents.
            </p>
          ) : (
            sharedDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onOpen={openDocument}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;