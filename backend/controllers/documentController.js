const db = require("../database/database");

// Create Document
const createDocument = (req, res) => {
    const { title, ownerId } = req.body;

    db.run(
        "INSERT INTO documents(title, content, ownerId) VALUES(?,?,?)",
        [title, "", ownerId],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                documentId: this.lastID
            });
        }
    );
};

// Get Documents
const getDocuments = (req, res) => {

    db.all(
        "SELECT * FROM documents",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);
        }
    );
};

// Update Document
const updateDocument = (req, res) => {

    const { id } = req.params;
    const { title, content } = req.body;

    db.run(
        `UPDATE documents
        SET title=?, content=?, updatedAt=CURRENT_TIMESTAMP
        WHERE id=?`,
        [title, content, id],
        function (err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    error: err.message
                });
            }

            res.json({
                success: true,
                message: "Document updated successfully"
            });

        }
    );

};

const uploadDocument = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const content = req.file.buffer.toString("utf8");

  res.json({
    success: true,
    title: req.file.originalname,
    content,
  });
};

// Share document
const shareDocument = (req, res) => {
  const { documentId, userId } = req.body;

  db.run(
    "INSERT INTO shared_documents(documentId, userId) VALUES(?, ?)",
    [documentId, userId],
    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.json({
        success: true,
        message: "Document shared successfully",
      });
    }
  );
};

// Get shared documents
const getSharedDocuments = (req, res) => {
  const { userId } = req.params;

  db.all(
    `
    SELECT documents.*
    FROM documents
    JOIN shared_documents
      ON documents.id = shared_documents.documentId
    WHERE shared_documents.userId = ?
    `,
    [userId],
    (err, rows) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
};

module.exports = {
  createDocument,
  getDocuments,
  updateDocument,
  uploadDocument,
  shareDocument,
  getSharedDocuments,
};