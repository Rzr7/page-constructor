import Utils from './utils.js';

/**
 * Represents a block.
 * @constructor
 * @param {String} name - Block name.
 * @param {Array} data - Block data (html, options, etc.).
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

  initHtml() {
    const url = this.path + '/block.html';
    this.html = Utils.get(url);
  }

  initDefaults() {
    this.defaults = this.getOption('variables');
  }

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

  getOption(optionName) {
    return this.data[optionName];
  }

  getThumbnail(getUrl = false) {
    const url = this.path + '/' + this.getOption('thumbnail');
    if (getUrl) {
      return url;
    }
    return Utils.get(url);
  }

  getHtml() {
    return this.html;
  }
}
