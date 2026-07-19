const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [".txt", ".md"];

    if (allowed.some((ext) => file.originalname.endsWith(ext))) {
      cb(null, true);
    } else {
      cb(new Error("Only .txt and .md files are allowed"));
    }
  },
});

module.exports = upload;