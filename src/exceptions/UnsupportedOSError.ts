export default class extends Error {
  constructor() {
    super(`${process.platform} OS is not supported. msoffice2pdf is available for Linux, Windows and MAC`);
  }
}