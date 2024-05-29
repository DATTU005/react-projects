const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).json({ filename: req.file.filename, originalname: req.file.originalname });
});

app.get("/files", (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  fs.readdir("uploads", (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan files");
    }
    const fileList = files.map((file) => {
      return { filename: file, originalname: file.split("-").slice(1).join("-") };
    });
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedFiles = fileList.slice(startIndex, endIndex);
    res.status(200).json({
      total: fileList.length,
      page,
      totalPages: Math.ceil(fileList.length / limit),
      files: paginatedFiles,
    });
  });
});

app.delete("/files/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).send("Unable to delete file");
    }
    res.status(200).send("File deleted successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
