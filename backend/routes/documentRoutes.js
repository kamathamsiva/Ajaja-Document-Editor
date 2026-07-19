const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const authenticateToken = require("../middleware/authMiddleware");

const {
  createDocument,
  getDocuments,
  updateDocument,
  uploadDocument,
  shareDocument,
  getSharedDocuments,
} = require("../controllers/documentController");

// Protect all document routes
router.post("/", authenticateToken, createDocument);

router.get("/", authenticateToken, getDocuments);

router.put("/:id", authenticateToken, updateDocument);

router.post(
  "/upload",
  authenticateToken,
  upload.single("file"),
  uploadDocument
);

router.post("/share", authenticateToken, shareDocument);

router.get(
  "/shared/:userId",
  authenticateToken,
  getSharedDocuments
);

module.exports = router;