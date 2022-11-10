import Msoffice2pdfOptions from '~/interfaces/Msoffice2pdfOptions';
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
declare const _default: (inputPath: string, outputPath: string, options?: Msoffice2pdfOptions) => Promise<void>;
export default _default;
