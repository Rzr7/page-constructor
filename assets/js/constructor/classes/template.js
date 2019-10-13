import Block from './block.js';

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
  }

  parseTemplate() {
    const templatePath = this.path + '/template.json';
    this.templateInfo = this.getRequest(templatePath);
  }

  parseBlocks() {
    const blocksPath = this.path + '/blocks/';
    const that = this;
    $.each(this.templateInfo.blocks, function(k, block) {
      that.createBlock(
          block,
          that.getRequest(blocksPath + block + '/block.json'),
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
