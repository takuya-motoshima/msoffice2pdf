const fs = require('fs');
const msoffice2pdf = require('../dist/build.common');

describe('Convert Excel97-2003 to PDF', () => {
  test('Should convert Excel97-2003 to PDF', async () => {
    const inputPath = `${__dirname}/documents/excel97-2003.xls`;
    const outputPath = `${__dirname}/convert/excel97-2003.pdf`;
    await msoffice2pdf(inputPath, outputPath);
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('Should convert Excel97-2003 to PDF using the language option', async () => {
    const inputPath = `${__dirname}/documents/excel97-2003_ja.xls`;
    const outputPath = `${__dirname}/convert/excel97-2003_ja.pdf`;
    await msoffice2pdf(inputPath, outputPath, {language: 'ja'});
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});