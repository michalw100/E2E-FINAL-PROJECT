const model = require("../models/filesModel");
const { getClientIDOrEmployeeIDByUserID } = require("../models/usersModel");
const { google } = require("googleapis");
const fs = require("fs");
const { Readable } = require("stream");
const path = require("path");

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const SERVICE_ACCOUNT_KEY_FILE = path.join(
  __dirname,
  "../southern-waters-425513-d6-3bb59649cf3c.json"
);

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_KEY_FILE,
  scopes: SCOPES,
});

async function listFiles(userID, type) {
  // console.log(type)
  try {
    let files;
    // console.log(userID);
    const realID = await getClientIDOrEmployeeIDByUserID(userID);
    if (realID[0].client_id) {
      const result = await model.getFilesByClientID(realID[0].client_id, type);
      files = result;
    } else {
      const result = await model.getFilesByEmployeeID(
        realID[0].employee_id,
        type
      );
      files = result;
    }
    const filteredFiles = files.filter((file) => file.id !== null);

    return filteredFiles;
  } catch (error) {
    throw error;
  }
}

async function uploadFile(
  uploaderID,
  clientID,
  uploadedFiles,
  filesNames,
  type
) {
  try {
    const realclientID = await getClientIDOrEmployeeIDByUserID(clientID);
    for (const [index, file] of uploadedFiles.entries()) {
      if (file.mimetype !== "application/pdf") {
        throw new Error("Only PDF files are allowed");
      }
      const fileId = await uploadFileToDrive(file.buffer, file.originalname);
      await model.saveFileToDB(
        fileId,
        filesNames[index],
        type,
        uploaderID,
        realclientID[0].client_id
      );
      // console.log("saved");
    }
    return;
  } catch (error) {
    throw error;
  }
}

async function uploadFileToDrive(fileBuffer, fileName) {
  const drive = google.drive({ version: "v3", auth });

  const fileMetadata = {
    name: fileName,
  };

  const media = {
    mimeType: "application/pdf",
    body: bufferToStream(fileBuffer),
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    return file.data.id;
  } catch (err) {
    throw new Error("Error uploading file: " + err.message);
  }
}

function bufferToStream(buffer) {
  const stream = new Readable();
  stream._read = () => {};
  stream.push(buffer);
  stream.push(null);
  return stream;
}

async function deleteAllFiles(auth) {
  try {
    const drive = google.drive({ version: "v3", auth });

    // Start from the root directory
    await deleteAllFilesInFolder(drive, "root");
  } catch (error) {
    console.error("Error deleting files:", error);
  }
}

async function deleteAllFilesInFolder(drive, folderId) {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents`,
      fields: "files(id, name, mimeType)",
    });

    const files = response.data.files;

    for (const file of files) {
      if (file.mimeType === "application/vnd.google-apps.folder") {
        // Recursively delete all contents of this folder
        await deleteAllFilesInFolder(drive, file.id);
      }

      // Delete the file or folder
      try {
        await drive.files.delete({ fileId: file.id });
        console.log(`Deleted ${file.name} (${file.id})`);
      } catch (error) {
        if (
          error.errors &&
          error.errors[0] &&
          error.errors[0].reason === "notFound"
        ) {
          console.log(`File not found: ${file.id}`);
        } else {
          console.error(`Error deleting ${file.name} (${file.id}):`, error);
        }
      }
    }
  } catch (error) {
    console.error(`Error listing files in folder ${folderId}:`, error);
  }
}

async function downloadFile(res, fileId) {
  try {
    const drive = google.drive({ version: "v3", auth });

    // Get file metadata
    const fileInfo = await drive.files.get({
      fileId: fileId,
      fields: "name, mimeType",
    });

    if (fileInfo.data.mimeType !== "application/pdf") {
      throw new Error("File is not a PDF");
    }

    // Get file content as a stream
    const response = await drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "stream" }
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileInfo.data.name}"`
    );

    return response;
  } catch (error) {
    throw error;
  }
}

async function viewFile(res, fileId) {
  try {
    const drive = google.drive({ version: "v3", auth });

    // Get file metadata
    const fileInfo = await drive.files.get({
      fileId: fileId,
      fields: "name, mimeType",
    });

    // Check if file is a PDF
    if (fileInfo.data.mimeType !== "application/pdf") {
      throw new Error("File is not a PDF");
    }

    // Get file content as a stream
    const response = await drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "stream" }
    );

    // Set headers to display the file inline
    res.setHeader("Content-Type", fileInfo.data.mimeType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${fileInfo.data.name}"`
    );
    return response;
  } catch (error) {
    throw error;
  }
}
async function updateRemarkFile(id, remark) {
  try {
    const file = await model.updateRemarkFile(id, remark);
    return file[0];
  } catch (err) {
    throw err;
  }
}

async function updateStatusFile(id, status) {
  try {
    const file = await model.updateStatusFile(id, status);
    return file[0];
  } catch (err) {
    throw err;
  }
}

async function updateTypeFile(id, type) {
  try {
    const file = await model.updateTypeFile(id, type);
    return file[0];
  } catch (err) {
    throw err;
  }
}

async function countTypeFile(type, userID) {
  try {
    const realID = await getClientIDOrEmployeeIDByUserID(userID);
    if (realID[0].client_id) {
      const result = await model.countTypeFileByClientID(type, userID);
      return result[0];
    } else {
      const result = await model.countTypeFileByEmployeeID(type, userID);
      if (!result[0]) {
        return { employeeID: userID, count: 0 };
      }
      return result[0];
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  countTypeFile,
  listFiles,
  uploadFile,
  deleteAllFiles,
  downloadFile,
  viewFile,
  updateRemarkFile,
  updateStatusFile,
  updateTypeFile,
};
