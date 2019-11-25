import Block from './block.js';
import Utils from './utils.js';

/**
 * Represents a template.
 * @constructor
 * @param {String} id - Template id (folder name).
 * @param {String} path - Template path to folder.
 */
export default class Template {
  constructor(id, path) {
    this.templateId = id;
    this.blocks = {};
    this.templateInfo = {};
    this.path = path + '/' + this.templateId;
    this.styles = this.path + '/assets/css/styles.css';
    this.parseTemplate();
    this.parseBlocks();
  }

  /**
   * Parse template data from template.json file.
   * @throws {Error} - Path to template is invalid/not reachable
   */
  parseTemplate() {
    const templatePath = this.path + '/template.json?' +
      new Date().getMilliseconds();
    const templateInfo = Utils.get(templatePath);
    if (!templateInfo) {
      throw new Error('Invalid template/template path');
    }
    this.templateInfo = templateInfo;
    console.log('this template info', this.templateInfo);
  }

  /**
   * Parse block data from block.json file and create block object.
   * @throws {Error} - Block is not existing
   */
  parseBlocks() {
    const blocksPath = this.path + '/blocks/';
    const that = this;
    $.each(this.templateInfo.blocks, function(k, block) {
      const blockInfo = Utils.get(blocksPath + block + '/block.json?' +
        new Date().getMilliseconds());
      if (!blockInfo) {
        throw new Error('Invalid block ("' + block + '")');
      };
      console.log('FIND PROPS HERE', that);
      const whatINeed=that.templateInfo.properties;
      that.createBlock(
          block,
          blockInfo,
          blocksPath + block,
          whatINeed
      );
    });
  }

  /**
   * Create block object and add it to template blocks array.
   * @param {String} blockId - Block name.
   * @param {String} blockData - Block json data.
   * @param {String} url - Path to block folder.
   * @param {Object} props - template.properties
   */
  createBlock(blockId, blockData, url, props) {
    this.blocks[blockId] = new Block(blockId, blockData, url, props);
  }

  /**
   * Get block html string
   * @param {String} blockId - Block name.
   * @return {String} Block html
   */
  getBlockHtml(blockId) {
    return this.getBlock(blockId).getHtml();
  }

  // getBlockId(blockId) { WIP
  //   console.log(this.getBlock(blockId));
  // }

  /**
   * Get block object
   * @param {String} blockId - Block name.
   * @return {Block} Block object
   */
  getBlock(blockId) {
    return this.blocks[blockId];
  }

  /**
   * Get styles link
   * @return {String} Styles file link
   */
  getStyles() {
    return this.styles;
  }

  /**
   * Get block thumbnail
   * @param {String} blockId - Block name.
   * @param {Boolean} getUrl - Do we need only url or image object?
   * @return {(String|Image)} Thumbnail Url or Image object
   */
  getBlockThumbnail(blockId, getUrl = false) {
    return this.getBlock(blockId).getThumbnail(getUrl);
  }
}
