export default class extends Error {
  constructor() {
    super(`An unsupported file was specified as the conversion source. msoffice2pdf supports ppt, pptx, doc, docx, xls, xlsx as conversion sources`);
  }
}