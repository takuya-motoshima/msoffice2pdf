const path = require('path');

/**
 * View's configuration interface.
 */
module.exports = {
  /**
   * Absolute path to the directory where the view files are located, defaults to `<application root directory>/views`.
   * @type {string}
   */
  views_dir: path.join(process.cwd(), 'views'),

  /**
   * Path to partials templates, one or several directories, defaults to `<application root directory>/views/partials`.
   * @type {string|string[]}
   */
  partials_dir: path.join(process.cwd(), 'views/partials'),

  /**
   * Path to layout templates, defaults to `<application root directory>/views/layout`.
   * @type {string}
   */
  layouts_dir: path.join(process.cwd(), 'views/layout'),

  /**
   * Absolute path to default layout template. defaults to `<application root directory>/views/layout/default.hbs`.
   * @type {string}
   */
  default_layout: path.join(process.cwd(), 'views/layout/default.hbs'),

  /**
   * Extension for templates & partials, defaults to `.hbs`,
   * @type {string}
   */
  extension: '.hbs',

  /**
   * Hook function just before the view is rendered.
   * For example, you can set your own local variables that can be used within the view.
   *
   * @example
   * // The message set here can be referenced in the view as {{message}}.
   * beforeRender: res => {
   *   res.locals.message = 'Hello World';
   * }
   *
   * @type {(res: express.Response) => void}
   */
  beforeRender: (res) => {}
}