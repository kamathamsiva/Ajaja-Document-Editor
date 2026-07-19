import "../styles/components.css";

function DocumentCard({ document, onOpen }) {
  return (
  <div
    className="document-card"
    onClick={() => onOpen(document)}
  >
    <div className="document-title">
      📄 {document.title}
    </div>

    <div className="document-owner">
      Owner ID: {document.ownerId}
    </div>

    <div className="document-date">
      Updated:
      {" "}
      {new Date(document.updatedAt).toLocaleString()}
    </div>
  </div>
);
}

export default DocumentCard;