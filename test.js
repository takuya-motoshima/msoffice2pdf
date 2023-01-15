const msoffice2pdf = require('./dist/build.common');

(async () => {
  try {
    console.log('Start of conversion.');
    const inputPath = `${__dirname}/docs/evidence/source-office-documents/089.doc`;
    const outputPath = `${__dirname}/test.pdf`;
    await msoffice2pdf(inputPath, outputPath, {
      language: 'ja',
      // libreOfficeBinaryPath: '/usr/bin/libreoffice7.4',
    });
    console.log('Conversion succeeded.');
  } catch (err) {
    console.error('Conversion error.', err.message);  
  }
})();