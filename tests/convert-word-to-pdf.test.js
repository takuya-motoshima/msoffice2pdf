const fs = require('fs');
const msoffice2pdf = require('../dist/build.common');

describe('Convert Word to PDF', () => {
  test('Should convert Word to PDF', async () => {
    const inputPath = `${__dirname}/documents/word.docx`;
    const outputPath = `${__dirname}/convert/word.pdf`;
    await msoffice2pdf(inputPath, outputPath);
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('Should convert Word to PDF using the language option', async () => {
    const inputPath = `${__dirname}/documents/word_ja.docx`;
    const outputPath = `${__dirname}/convert/word_ja.pdf`;
    await msoffice2pdf(inputPath, outputPath, {language: 'ja'});
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});