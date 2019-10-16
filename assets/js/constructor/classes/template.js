import Block from './block.js';
import Utils from './utils.js';

/**
 * Represents a template.
 * @constructor
 * @param {String} id - Template id (folder name).
 */
export default class Template {
  constructor(id, path) {
    this.templateId = id;
    this.blocks = {};
    this.templateInfo = {};
    this.path = path + '/' + this.templateId;
    this.parseTemplate();
    this.parseBlocks();
  }

  parseTemplate() {
    const templatePath = this.path + '/template.json?' +
      new Date().getMilliseconds();
    const templateInfo = Utils.get(templatePath);
    if (!templateInfo) {
      throw new Error('Invalid template/template path');
    }
    this.templateInfo = templateInfo;
  }

  parseBlocks() {
    const blocksPath = this.path + '/blocks/';
    const that = this;
    $.each(this.templateInfo.blocks, function(k, block) {
      const blockInfo = Utils.get(blocksPath + block + '/block.json?' +
        new Date().getMilliseconds());
      if (!blockInfo) {
        throw new Error('Invalid block ("' + block + '")');
      }
      that.createBlock(
          block,
          blockInfo,
          blocksPath + block
      );
    });
  }

  createBlock(blockId, blockData, url) {
    this.blocks[blockId] = new Block(blockId, blockData, url);
  }

  getBlockHtml(blockId) {
    return this.getBlock(blockId).getHtml();
  }

  getBlock(blockId) {
    return this.blocks[blockId];
  }

  getBlockThumbnail(blockId, getUrl = false) {
    return this.getBlock(blockId).getThumbnail(getUrl);
  }
}
