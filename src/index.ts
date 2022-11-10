import path from 'path';
import fs from 'fs';
import url from 'url';
import {execFile} from 'child_process';
import glob from 'glob';
import tmp from 'tmp';
import Msoffice2pdfOptions from '~/interfaces/Msoffice2pdfOptions';
import UnsupportedOSError from '~/exceptions/UnsupportedOSError';
import LibreOfficeNotFoundError from '~/exceptions/LibreOfficeNotFoundError';
import SpecifiedLibreOfficeNotFoundError from '~/exceptions/SpecifiedLibreOfficeNotFoundError';
import InputFileNotFoundError from '~/exceptions/InputFileNotFoundError';
import UnsupportedFileError from '~/exceptions/UnsupportedFileError';
import UnsupportedLanguageError from '~/exceptions/UnsupportedLanguageError';

/**
 * Find the LibreOffice executable (soffice) path.
 *
 * @return {string}                   LibreOffice executable (soffice) path.
 * @throws {UnsupportedOSError}       For unsupported operating systems. msoffice2pdf supports Linux, MAC, and Windows.
 * @throws {LibreOfficeNotFoundError} LibreOffice executable not found, please install LibreOffice.
 */
function findLibreOfficeBinaryPaths(): string {
  let libreOfficeBinaryFiles;
  if (process.platform==='linux')
    libreOfficeBinaryFiles = [
      '/usr/bin/libreoffice',
      '/usr/bin/soffice',
      '/snap/bin/libreoffice'
    ];
  else if (process.platform==='darwin')
    libreOfficeBinaryFiles = [
      '/Applications/LibreOffice.app/Contents/MacOS/soffice'
    ];
  else if (process.platform==='win32')
    libreOfficeBinaryFiles = [
      ...glob.sync(path.join(process.env.PROGRAMFILES as string, 'LibreOffice*/program/soffice.exe').replaceAll('\\', '/')),
      ...glob.sync(path.join(process.env['PROGRAMFILES(X86)'] as string, 'LibreOffice*/program/soffice.exe').replaceAll('\\', '/')),
    ];
  else 
    throw new UnsupportedOSError();
  const libreOfficeBinaryPath = libreOfficeBinaryFiles.find(libreOfficeBinaryFile => {
    try {
      fs.accessSync(libreOfficeBinaryFile);
      return true;
    } catch {}
    return false;
  });
  if (!libreOfficeBinaryPath)
    throw new LibreOfficeNotFoundError();
  return libreOfficeBinaryPath;
}

/**
 * Create conversion command options.
 *
 * @param {string} inputPath              Paths to office documents (ppt, pptx, doc, docx, xls, xlsx).
 * @param {string} outputDir              Directory to output PDF.
 * @param {string} userInstallationDir    Directory where user profiles are created.
 * @param {string} language?              Document Language. Default is undefined.
 *                                        The following can be used.
 *                                        af,sq,ar-dz,ar-bh,ar-eg,ar-iq,ar-jo,ar-kw,ar-lb,ar-ly,ar-ma,ar-om,ar-qa,ar-sa,ar-sy,ar-tn,ar-ae,ar-ye,eu,be,
 *                                        bg,ca,zh-hk,zh-cn,zh-sg,zh-tw,hr,cs,da,nl-be,nl,en,en-au,en-bz,en-ca,en-ie,en-jm,en-nz,en-za,en-tt,
 *                                        en-gb,en-us,et,fo,fa,fi,fr-be,fr-ca,fr-lu,fr,fr-ch,gd,de-at,de-li,de-lu,de,de-ch,el,he,hi,
 *                                        hu,is,id,ga,it,it-ch,ja,ko,ko,ku,lv,lt,mk,ml,ms,mt,no,nb,nn,pl,
 *                                        pt-br,pt,pa,rm,ro,ro-md,ru,ru-md,sr,sk,sl,sb,es-ar,es-bo,es-cl,es-co,es-cr,es-do,es-ec,es-sv,
 *                                        es-gt,es-hn,es-mx,es-ni,es-pa,es-py,es-pe,es-pr,es,es-uy,es-ve,sv,sv-fi,th,ts,tn,tr,ua,ur,ve,
 *                                        vi,cy,xh,ji,zu
 * @return {string[]}                     Conversion command options.
 */
function createConversionCommandOptions(inputPath: string, outputDir: string, userInstallationDir: string, language?: string): string[] {
  const args = [`-env:UserInstallation=${url.pathToFileURL(userInstallationDir)}`, '--headless', '--norestore'];
  if (language)
    args.push(`--language=${language}`);
  args.push('--convert-to', 'pdf', inputPath, '--outdir', outputDir);
  return args;
}

/**
 * Convert office documents (ppt, pptx, doc, docx, xls, xlsx) to PDF.
 *
 * @param {string} inputPath                      Paths to office documents (ppt, pptx, doc, docx, xls, xlsx).
 * @param {string} outputPath                     PDF Path.
 * @param {string} options.libreOfficeBinaryPath? The path to the libreOffice executable (soffice) that you installed.
 *                                                The default is to use the file found by looking for the following file.
 *                                                For Linux:
 *                                                  /usr/bin/libreoffice
 *                                                  /usr/bin/soffice
 *                                                  /snap/bin/libreoffice
 *                                                For MAC:
 *                                                  /Applications/LibreOffice.app/Contents/MacOS/soffice
 *                                                For WIndows:
 *                                                  C:\Program Files\LibreOffice*\program\soffice.exe
 *                                                  C:\Program Files (x86)\LibreOffice*\program\soffice.exe
 * @param {string} options.language?              Document Language. Default is undefined.
 *                                                The following can be used.
 *                                                af,sq,ar-dz,ar-bh,ar-eg,ar-iq,ar-jo,ar-kw,ar-lb,ar-ly,ar-ma,ar-om,ar-qa,ar-sa,ar-sy,ar-tn,ar-ae,ar-ye,eu,be,
 *                                                bg,ca,zh-hk,zh-cn,zh-sg,zh-tw,hr,cs,da,nl-be,nl,en,en-au,en-bz,en-ca,en-ie,en-jm,en-nz,en-za,en-tt,
 *                                                en-gb,en-us,et,fo,fa,fi,fr-be,fr-ca,fr-lu,fr,fr-ch,gd,de-at,de-li,de-lu,de,de-ch,el,he,hi,
 *                                                hu,is,id,ga,it,it-ch,ja,ko,ko,ku,lv,lt,mk,ml,ms,mt,no,nb,nn,pl,
 *                                                pt-br,pt,pa,rm,ro,ro-md,ru,ru-md,sr,sk,sl,sb,es-ar,es-bo,es-cl,es-co,es-cr,es-do,es-ec,es-sv,
 *                                                es-gt,es-hn,es-mx,es-ni,es-pa,es-py,es-pe,es-pr,es,es-uy,es-ve,sv,sv-fi,th,ts,tn,tr,ua,ur,ve,
 *                                                vi,cy,xh,ji,zu
 * @returns {Promise<void>}
 * @throws {UnsupportedOSError}                   For unsupported operating systems. msoffice2pdf supports Linux, MAC, and Windows.
 * @throws {LibreOfficeNotFoundError}             LibreOffice executable not found, please install LibreOffice.
 * @throws {SpecifiedLibreOfficeNotFoundError}    The specified LibreOffice executable cannot be found.
 * @throws {InputFileNotFoundError}               The input file to be converted cannot be found.
 * @throws {UnsupportedFileError}                 An unsupported file was specified as the conversion source.
 *                                                msoffice2pdf supports ppt, pptx, doc, docx, xls, xlsx as conversion sources.
 * @throws {UnsupportedLanguageError}             An unsupported language was specified.
 */
export default async (inputPath: string, outputPath: string, options?: Msoffice2pdfOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Initialize options.
      options = Object.assign({
        libreOfficeBinaryPath: undefined,
        language: undefined
      }, options);

      // Does the input file exist?
      if (!fs.existsSync(inputPath))
        throw new InputFileNotFoundError(inputPath);
      
      // Check the input file extension.
      if (!path.extname(inputPath).match(/^\.(ppt|doc|xls)x?$/i))
        throw new UnsupportedFileError();

      // Check language.
      if (options.language && !options.language.match(/^(af|sq|ar\-dz|ar\-bh|ar\-eg|ar\-iq|ar\-jo|ar\-kw|ar\-lb|ar\-ly|ar\-ma|ar\-om|ar\-qa|ar\-sa|ar\-sy|ar\-tn|ar\-ae|ar\-ye|eu|be|bg|ca|zh\-hk|zh\-cn|zh\-sg|zh\-tw|hr|cs|da|nl\-be|nl|en|en\-au|en\-bz|en\-ca|en\-ie|en\-jm|en\-nz|en\-za|en\-tt|en\-gb|en\-us|et|fo|fa|fi|fr\-be|fr\-ca|fr\-lu|fr|fr\-ch|gd|de\-at|de\-li|de\-lu|de|de\-ch|el|he|hi|hu|is|id|ga|it|it\-ch|ja|ko|ko|ku|lv|lt|mk|ml|ms|mt|no|nb|nn|pl|pt\-br|pt|pa|rm|ro|ro\-md|ru|ru\-md|sr|sk|sl|sb|es\-ar|es\-bo|es\-cl|es\-co|es\-cr|es\-do|es\-ec|es\-sv|es\-gt|es\-hn|es\-mx|es\-ni|es\-pa|es\-py|es\-pe|es\-pr|es|es\-uy|es\-ve|sv|sv\-fi|th|ts|tn|tr|ua|ur|ve|vi|cy|xh|ji|zu)$/))
        throw new UnsupportedLanguageError(options.language);

      // Find the LibreOffice executable (soffice) path.
      let libreOfficeBinaryPath;
      if (!options.libreOfficeBinaryPath)
        libreOfficeBinaryPath = findLibreOfficeBinaryPaths();
      else {
        if (!fs.existsSync(options.libreOfficeBinaryPath))
          throw new SpecifiedLibreOfficeNotFoundError(options.libreOfficeBinaryPath);
        libreOfficeBinaryPath = options.libreOfficeBinaryPath;
      }

      // Randomly create a directory to store user profiles.
      // By creating user profiles in conversion units, libreOffice can be run multiple times at the same time.
      const userInstallationDir = tmp.dirSync({prefix: 'msoffice2pdf', unsafeCleanup: true});

      // A directory to temporarily place files converted to PDF.
      const tmpDir = tmp.dirSync({prefix: 'msoffice2pdf', unsafeCleanup: true});

      // Create conversion command options.
      const args = createConversionCommandOptions(inputPath, tmpDir.name, userInstallationDir.name, options.language);

      // Execute the convert command.
      execFile(libreOfficeBinaryPath, args, err => {
        if (err) {
          // Delete temporary directories.
          userInstallationDir.removeCallback();
          tmpDir.removeCallback();

          // Return error.
          return void reject(err);
        }

        // Create the output directory.
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir))
          fs.mkdirSync(outputDir, {recursive: true});

        // Move a temporarily saved PDF file to the specified path.
        const tmpPdfPath = path.join(tmpDir.name, `${path.parse(inputPath).name}.pdf`);
        fs.renameSync(tmpPdfPath, outputPath);

        // Delete temporary directories.
        userInstallationDir.removeCallback();
        tmpDir.removeCallback();

        // Return success.
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}