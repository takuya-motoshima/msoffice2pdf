const path = require('path');

/**
 * Express Sweet basic configuration interface.
 */
module.exports = {
  /**
   * Environment variable file (.env) path, defaults to none (undefined).
   * @type {string}
   */
  env_path: '.env',

  /**
   * CORS permission, defaults to invalid (false).
   * @type {{enabled: boolean}}
   */
  cors_enabled: false,

  /**
   * Maximum body size you can request, defaults to `100kb`.
   * @type {string|number}
   */
  max_body_size: '100mb',

  /**
   * Absolute path to the router directory, defaults to `<application root directory>/routes`.
   * @type {string}
   */
  router_dir: path.join(process.cwd(), 'routes'),

  /**
   * The endpoint to run when the root URL is requested, defaults to none (undefined).
   * @type {string}
   */
  default_router: undefined,

  /**
   * This is a hook that rewrites the base URL.
   * If you want to rewrite the app.locals.baseUrl property and the view's baseUrl variable, use this hook to return a new base URL.
   * The default value is the referrer's origin (eg https://example.com).
   *
   * @example
   * rewrite_base_url: baseUrl => {
   *   return `${baseUrl}/admin`;
   * }
   * 
   * @type {(baseUrl: string): string}
   */
  rewrite_base_url: baseUrl => {
    return baseUrl;
  },

  /**
   * This is a hook for error handling.
   * For example, you can use it when you want to send an external notification of the error received by this hook.
   * 
   * @example
   * error_handler: async err => {
   *   // Notify system administrator of error.
   *   return new Promise((resolve, reject) => {
   *     const sendmail = require('sendmail')();
   *     sendmail({
   *       from: 'no-reply@example.com',
   *       to: 'administrator@example.com',
   *       subject: 'Error occurred',
   *       text: err.message
   *     }, err => {
   *       err ? reject(err) : resolve();
   *     });
   *   });
   * }
   * 
   * @type {(err: any): void|Promise<void>}
   */
  error_handler: err => {
    console.error(`An error has occurred. Error message: ${err.message}`);
  }
}