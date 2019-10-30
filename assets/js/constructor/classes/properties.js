import Block from './block.js';

export default class Properties {
  constructor() {
    // Nothing during initialization???
    // this.template = template;
    this.block;
    this.propList = [];
    this.html = '';
  }

  setBlock(block) {
    this.block = block;
    console.log('recieved setblock, setting to', block);
    console.log('Going deeper:', Block.getBlockId(block));
  }

  getBlock() {
    return this.block;
  }

  getBlockDefaults(blockId) {
    console.log('Got block defaults', this.block.defaults);
  }

  getBlockVariables(blockId) {

  }

  initPropertiesLayout(propList) {

  }

  showPropertiesForBlock(blockId) {

  }
}
