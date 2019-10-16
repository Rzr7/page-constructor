import Utils from './utils.js';

/**
 * Represents a block.
 * @constructor
 * @param {String} name - Block name.
 * @param {Array} data - Block data (html, options, etc.).
 * @param {String} path - Path to block folder.
 */
export default class Block {
  constructor(name, data, path) {
    this.name = name;
    this.data = data;
    this.path = path;
    this.defaults = {};
    this.html = '';
    this.initDefaults();
    this.initHtml();
    this.parseVariables();
  }

  /**
   * Set block html.
   */
  initHtml() {
    const url = this.path + '/block.html?' +
      new Date().getMilliseconds();
    this.html = Utils.get(url);
  }

  /**
   * Set block default variables from json.
   */
  initDefaults() {
    this.defaults = this.getOption('variables');
  }

  /**
   * Parse block variables from html and replace with defaults.
   */
  parseVariables() {
    const that = this;
    $.each(this.defaults, function(k, v) {
      if (v.type === 'text') {
        const variable = '\\[\\[ ' + k.toUpperCase() + ' \\]\\]';
        const regex = new RegExp(variable, 'g');
        that.html = that.html.replace(regex, v.value);
      }
    });
  }

  /**
   * Get block option from json.
   * @param {String} optionName - Option name that we want to get
   * @return {(number|String|Array)} Block option
   */
  getOption(optionName) {
    return this.data[optionName];
  }

  /**
   * Get block option from json.
   * @param {Boolean} getUrl - Do we need url or Image object?
   * @return {(String|Image)} Block thumbnail
   */
  getThumbnail(getUrl = false) {
    const url = this.path + '/' + this.getOption('thumbnail');
    if (getUrl) {
      return url;
    }
    return Utils.get(url);
  }

  /**
   * Get block html.
   * @return {String} Block HTML
   */
  getHtml() {
    return this.html;
  }
}
