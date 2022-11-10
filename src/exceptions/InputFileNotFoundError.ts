export default class extends Error {
  constructor(inputPath: string) {
    super(`Input file (${inputPath}) not found`);
  }
}