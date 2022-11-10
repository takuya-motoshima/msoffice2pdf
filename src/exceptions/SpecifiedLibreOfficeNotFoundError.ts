export default class extends Error {
  constructor(libreOfficeBinaryPath: string) {
    super(`The specified LibreOffice (${libreOfficeBinaryPath}) cannot be found`);
  }
}