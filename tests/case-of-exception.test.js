const msoffice2pdf = require('../dist/build.common');

describe('Case of exception', () => {
  test('Should throw an error for unsupported OS', async () => {
    const originPlatform = process.platform;
    try {
      // Rewrite platform name to unsupported OS name.
      Object.defineProperty(process, 'platform', {value: 'unknown'});
      const inputPath = `${__dirname}/documents/powerpoint.pptx`;
      const outputPath = `${__dirname}/convert/powerpoint.pdf`;
      await expect(msoffice2pdf(inputPath, outputPath)).rejects.toThrow();
    } finally {
      // Revert to what it was before the platform name was rewritten.
      Object.defineProperty(process, 'platform', {value: originPlatform});
    }
  });

  test('Should throw an error for unsupported input file', async () => {
    const inputPath = `${__dirname}/documents/planttext.txt`;
    const outputPath = `${__dirname}/convert/planttext.pdf`;
    await expect(msoffice2pdf(inputPath, outputPath)).rejects.toThrow();
  });

  test('Should throw an error for input file not found', async () => {
    const inputPath = `${__dirname}/documents/unknown.pptx`;
    const outputPath = `${__dirname}/convert/unknown.pdf`;
    await expect(msoffice2pdf(inputPath, outputPath)).rejects.toThrow();
  });

  test('Should throw an error for LibreOffice not found', async () => {
    const inputPath = `${__dirname}/documents/powerpoint.pptx`;
    const outputPath = `${__dirname}/convert/powerpoint.pdf`;
    await expect(msoffice2pdf(inputPath, outputPath, {libreOfficeBinaryPath: 'unknown'})).rejects.toThrow();
  });

  test('Should throw an error for unsupported language option', async () => {
    const inputPath = `${__dirname}/documents/powerpoint.pptx`;
    const outputPath = `${__dirname}/convert/powerpoint.pdf`;
    await expect(msoffice2pdf(inputPath, outputPath, {language: 'unknown'})).rejects.toThrow();
  });
});