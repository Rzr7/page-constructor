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
    this.html = '';
    this.initHtml();
  }

  initHtml() {
    const url = this.path + '/block.html';
    this.html = this.getRequest(url);
  }

  getHtml() {
    return this.html;
  }

  getRequest(url) {
    let result = false;
    $.ajax({
      async: false,
      url: url,
      type: 'GET',
      success: function(data) {
        result = data;
      },
      error: function(e) {
        console.dir(e);
      },
    });
    return result;
  }
}
