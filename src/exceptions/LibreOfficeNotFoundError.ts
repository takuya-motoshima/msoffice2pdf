export default class extends Error {
  constructor() {
    super('Could not find LibreOffice binary');
  }
}