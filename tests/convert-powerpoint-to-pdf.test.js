const fs = require('fs');
const msoffice2pdf = require('../dist/build.common');

describe('Convert PowerPoint to PDF', () => {
  test('Should convert PowerPoint to PDF', async () => {
    const inputPath = `${__dirname}/documents/powerpoint.pptx`;
    const outputPath = `${__dirname}/convert/powerpoint.pdf`;
    await msoffice2pdf(inputPath, outputPath);
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  test('Should convert PowerPoint to PDF using the language option', async () => {
    const inputPath = `${__dirname}/documents/powerpoint_ja.pptx`;
    const outputPath = `${__dirname}/convert/powerpoint_ja.pdf`;
    await msoffice2pdf(inputPath, outputPath, {language: 'ja'});
    expect(fs.existsSync(outputPath)).toBe(true);
  });
});