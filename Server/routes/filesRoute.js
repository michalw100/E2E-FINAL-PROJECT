const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  listFiles,
  uploadFile,
  deleteAllFiles,
  downloadFile,
  viewFile,
  updateRemarkFile,
  updateStatusFile,
  updateTypeFile,
  countTypeFile,
} = require("../controllers/filesController");
const checkAbilities = require("../Middlewares/checkAbilities");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", checkAbilities("read", "files"), async (req, res) => {
  try {
    const type = req.query.typeFile;
    const userID = req.query.userID;
    const files = await listFiles(userID, type);
    res.status(200).send(files);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/type", checkAbilities("read", "files"), async (req, res) => {
  try {
    const type = req.query.type;
    const userID = req.query.clientID;
    const files = await countTypeFile(type, userID);
    res.status(200).send(files);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post(
  "/upload",
  checkAbilities("create", "files"),
  upload.array("files"),
  async (req, res) => {
    try {
      const { uploaderID, clientID, filesNames, typeFile } = req.body;
      const uploadedFiles = req.files;
      if (!uploadedFiles || uploadedFiles.length === 0) {
        return res.status(400).send({ message: "No files were uploaded" });
      }

      const filesNames1 = filesNames.split(",");
      // console.log(typeFile);

      const files = await uploadFile(
        uploaderID,
        clientID,
        uploadedFiles,
        filesNames1,
        typeFile
      );
      res.status(200).send({ message: `Files uploaded successfully` });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

router.delete(
  "/deleteAllFiles",
  checkAbilities("delete", "files"),
  async (req, res) => {
    try {
      const files = await deleteAllFiles();
      res.status(200).send({ message: "All files deleted successfully" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
);

router.get(
  "/download/:fileId",
  checkAbilities("read", "files"),
  async (req, res) => {
    try {
      const fileId = req.params.fileId;
      const response = await downloadFile(res, fileId);
      response.data.pipe(res);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
);

router.get(
  "/view/:fileId",
  checkAbilities("read", "files"),
  async (req, res) => {
    try {
      const fileId = req.params.fileId;
      const response = await viewFile(res, fileId);
      response.data.pipe(res);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
);

router.put("/", checkAbilities("update", "files"), async (req, res) => {
  try {
    // console.log("change");
    const fileId = req.body.id;
    const remark = req.body.remark;
    const status = req.body.status;
    const type = req.body.type;

    if (remark) {
      const response = await updateRemarkFile(fileId, remark);
      res.status(200).send({ message: "update file successfully" });
    } else if (status) {
      const response = await updateStatusFile(fileId, status);
      res.status(200).send({ message: "update file successfully" });
    } else if (type) {
      const response = await updateTypeFile(fileId, type);
      res.status(200).send({ message: "update file successfully" });
    } else return res.status(400).send({ message: "No field to change" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
