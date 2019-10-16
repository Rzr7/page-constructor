import Block from './block.js';
import Utils from './utils.js';

/**
 * Represents a template.
 * @constructor
 * @param {String} id - Template id (folder name).
 */
export default class Template {
  constructor(id) {
    this.templateId = id;
    this.blocks = {};
    this.templateInfo = {};
    this.path = '/templates/' + this.templateId;
    this.parseTemplate();
    this.parseBlocks();
    console.log('INIT TEMPLATE');
    console.log(this.blocks);
  }

  parseTemplate() {
    const templatePath = this.path + '/template.json';
    this.templateInfo = Utils.get(templatePath);
  }

  parseBlocks() {
    const blocksPath = this.path + '/blocks/';
    const that = this;
    $.each(this.templateInfo.blocks, function(k, block) {
      that.createBlock(
          block,
          Utils.get(blocksPath + block + '/block.json'),
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
