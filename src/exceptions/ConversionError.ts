export default class extends Error {
  constructor() {
    super('An error occurred when executing the PDF conversion command');
  }
}