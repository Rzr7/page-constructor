import Utils from './utils.js';
/**
 * Represents a block.
 * @constructor
 * @param {String} name - Block name.
 * @param {Array} data - Block data (html, options, etc.).
 * @param {String} path - Path to block folder.
 */
export default class Block {
  constructor(name, data, path, props) {
    console.log('created block with properties',
        name, data, path, props);
    /**
     * This thing is used to give certain elements
     * properties that can be managed through the
     * properties tab
     * Like, divs should not have text values or font-size
     * and a, p, h1-6 tags should not have background-image etc
     */
    this.properties = props;
    this.name = name;
    // this.id = id;
    this.data = data;
    this.path = path;
    this.blocksPath = '../blocks/';
    this.defaults = {};
    this.html = '';
    this.initDefaults();
    // this.assignId(); // WIP
    this.initHtml();
    this.parseVariables();
    // console.log(this.)
    // console.log(this);
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
   *
   * @param {*} block - Block element (not jquery or raw html)
   * @return {Object} - Object with all ID related info
   */
  static getBlockId(block) {
    const indexOfId = block.id.indexOf('#');
    const idCode = block.id.slice(indexOfId, block.id.length);
    const idInfo = {id: block.id, idCode,
      defaultId: block.id.slice(0, indexOfId)};
    return idInfo;
  }

  assignId() {
    /**
     * Assign block its own ID with ID set in block.json
     * and make id="" tag inside HTML root element
     */
    this.id = this.getOption('id');
    // eslint-disable-next-line prefer-const
    let blockHtml = Utils.get(this.path + '/block.html?');
    const signedHtmlId = blockHtml.replace('>', ' id="'+this.id+'">');
    // const signedHtml = blockHtml.replace('class="', 'class="pcon-block ');
  }

  /**
   * Set block default variables from json.
   */
  initDefaults() {
    this.defaults = this.getOption('variables');
    console.log('THIS.DEFAULTS FOR', this.name, this.defaults);
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
   *
   * @param {string} blockId - find block file by id (i.e. header_title_1)
   * @return {param} this - temp
   */
  getBlockFromId(blockId) {
    return this;
  }

  /**
   * Get block html.
   * @return {String} Block HTML
   */
  getHtml() {
    return this.html;
  }
}
