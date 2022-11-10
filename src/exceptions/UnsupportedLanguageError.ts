export default class extends Error {
  constructor(language: string) {
    super(`An unsupported language (${language}) was specified`);
  }
}