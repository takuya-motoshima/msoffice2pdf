const fs = require('fs');
const express = require('express');
const msoffice2pdf = require('msoffice2pdf');
const tmp = require('tmp');
const {body, validationResult} = require('express-validator');

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
router.post('/', [
  body('language').optional({nullable: true, checkFalsy: true}).isIn(['af', 'sq', 'ar-dz', 'ar-bh', 'ar-eg', 'ar-iq', 'ar-jo', 'ar-kw', 'ar-lb', 'ar-ly', 'ar-ma', 'ar-om', 'ar-qa', 'ar-sa', 'ar-sy', 'ar-tn', 'ar-ae', 'ar-ye', 'eu', 'be', 'bg', 'ca', 'zh-hk', 'zh-cn', 'zh-sg', 'zh-tw', 'hr', 'cs', 'da', 'nl-be', 'nl', 'en', 'en-au', 'en-bz', 'en-ca', 'en-ie', 'en-jm', 'en-nz', 'en-za', 'en-tt', 'en-gb', 'en-us', 'et', 'fo', 'fa', 'fi', 'fr-be', 'fr-ca', 'fr-lu', 'fr', 'fr-ch', 'gd', 'de-at', 'de-li', 'de-lu', 'de', 'de-ch', 'el', 'he', 'hi', 'hu', 'is', 'id', 'ga', 'it', 'it-ch', 'ja', 'ko', 'ko', 'ku', 'lv', 'lt', 'mk', 'ml', 'ms', 'mt', 'no', 'nb', 'nn', 'pl', 'pt-br', 'pt', 'pa', 'rm', 'ro', 'ro-md', 'ru', 'ru-md', 'sr', 'sk', 'sl', 'sb', 'es-ar', 'es-bo', 'es-cl', 'es-co', 'es-cr', 'es-do', 'es-ec', 'es-sv', 'es-gt', 'es-hn', 'es-mx', 'es-ni', 'es-pa', 'es-py', 'es-pe', 'es-pr', 'es', 'es-uy', 'es-ve', 'sv', 'sv-fi', 'th', 'ts', 'tn', 'tr', 'ua', 'ur', 've', 'vi', 'cy', 'xh', 'ji', 'zu',]),
], async (req, res) => {
  try {
    const errs = validationResult(req);
    if (!errs.isEmpty()) {
      console.error('Form Validation Error:', errs.array());
      return void res.status(400).json({errors: errs.array()});
    } else if (!req.files || !req.files.length)
      throw new TypeError('files parameters are required');
    const file = req.files[0];
    const extension = getExtensionFromMimeType(file.mimetype);
    if (!extension)
      throw new TypeError('Mime type of the unsupported file');
    const inputPath = writeUploadedFileToTmp(file.buffer, extension);
    const fileName = file.originalname.replace(/\.[^/.]+$/, '.pdf')
    const outputPath = `${global.APP_DIR}/public/upload/${fileName}`;
    const options = {};
    if (req.body.language)
      options.language = req.body.language;
    await msoffice2pdf(inputPath, outputPath, options);
    res.json({filePath: outputPath.replace(`${global.APP_DIR}/public/`, '')});
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;