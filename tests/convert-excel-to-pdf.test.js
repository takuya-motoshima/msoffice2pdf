const fs = require('fs');
const msoffice2pdf = require('../dist/build.common');

describe('Convert Excel to PDF', () => {
  test('Should convert Excel to PDF', async () => {
    const inputPath = `${__dirname}/documents/excel.xlsx`;
    const outputPath = `${__dirname}/convert/excel.pdf`;
    await msoffice2pdf(inputPath, outputPath);
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('Should convert Excel to PDF using the language option', async () => {
    const inputPath = `${__dirname}/documents/excel_ja.xlsx`;
    const outputPath = `${__dirname}/convert/excel_ja.pdf`;
    await msoffice2pdf(inputPath, outputPath, {language: 'ja'});
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});