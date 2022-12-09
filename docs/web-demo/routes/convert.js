const fs = require('fs');
const express = require('express');
const msoffice2pdf = require('msoffice2pdf');
const tmp = require('tmp');

function getExtensionFromMimeType(mimeType) {
  return {
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  }[mimeType];
}

function writeUploadedFileToTmp(buffer, extension) {
  const tmpObj = tmp.fileSync({postfix: `.${extension}`});
  fs.writeFileSync(tmpObj.name, Buffer.from(buffer));
  return tmpObj.name;
}

const router = express.Router();
router.post('/', async (req, res, next) => {
  try {
    if (!req.files || !req.files.length)
      throw new TypeError('files parameters are required');
    const file = req.files[0];
    const extension = getExtensionFromMimeType(file.mimetype);
    if (!extension)
      throw new TypeError('Mime type of the unsupported file');
    const inputPath = writeUploadedFileToTmp(file.buffer, extension);
    const fileName = file.originalname.replace(/\.[^/.]+$/, '.pdf')
    const outputPath = `${global.APP_DIR}/public/upload/${fileName}`;
    await msoffice2pdf(inputPath, outputPath);
    res.json({filePath: outputPath.replace(`${global.APP_DIR}/public/`, '')});
  } catch (err) {
    next(err);
  }
});
module.exports = router;