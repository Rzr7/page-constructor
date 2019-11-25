import Block from './block.js';
import Builder from '../builder.js';
import Toolbar from './toolbar.js';
import Utils from './utils.js';

export default class Properties {
  constructor(builder) {
    // Nothing during initialization???
    // this.template = template;
    this.block;
    this.blockElement;
    this.blockInfo;
    this.propList = [];
    this.html = '';
    this.propsHtml = '';
    this.builder = builder;
    this.toolbar = builder.toolbar;
  }

  /**
   *
   * @param {jquery_block} block - Block element for further use (info scraping)
   */
  setBlock(block) {
    const that = this;
    const tempArray = this.builder.toolbar.getBlocksArray();
    tempArray.map((el) => {
      if (el.data.id == Block.getBlockId(block).defaultId) {
        that.block = el;
      }
    });
    this.blockElement = block;
    // console.log('recieved setblock, setting to', block);
    // console.log('Going deeper:', Block.getBlockId(block));
    this.blockInfo = Block.getBlockId(block);
    this.block = this.block.getBlockFromId();
    // console.log('Getting block info:', this.block);
    this.showPropertiesForBlock();
  }

  initAdjustableProperties() {
    //
  }

  getBlock() {
    return this.block;
  }

  getBlockDefaults(blockId) {
    // console.log('Got block defaults', this.block.defaults);
  }

  getBlockVariables(blockId) {
    this.block.getBlockFromId(blockId);
  }

  initPropertiesLayout(propList) {
    // console.log('Trying to post following HTML:',
    //     this.propsHtml);
    $('#properties').html(this.propsHtml);
  }


  /**
    * @param {Object} params - Color || size + unit || options
    */
  showPropertiesForBlock() {
    // console.log('These are properties this block should have:');
    // get variables
    const variables = Utils.objToArray(this.block.data.variables);
    variables.map((el) => {
      if (el.type == 'text') {
        // console.log(this.block.properties.text);
        // console.log('EL', el);
      }
    });

    this.propsHtml = '';
    const that = this;

    this.block.properties.text.map((variable) => {
      const params = Utils.objToArray(variable)[0];
      const paramName = Object.keys(variable)[0];
      console.log(paramName, params);
      const currentValue = 'absolute';
      let dropdownButtons = '';
      let isDropdownNeeded = '';
      let isDropdownNeeded2 = '';
      // eslint-disable-next-line prefer-const
      let isSizeInput='';
      // eslint-disable-next-line prefer-const
      let isColorInput='';
      // eslint-disable-next-line prefer-const
      let isTextInput='';

      /**
       * Check if parameter is of type Options
       * and assign a dropdown menu with options
       */
      console.log(that.blockInfo);
      console.log('TEST', $('#'+that.blockInfo.id).css('display'));
      Object.keys(params)[0] == 'options' ? (
        isDropdownNeeded = `
        <div class="dropdown">
          <a class="btn btn-secondary dropdown-toggle" 
          href="#" role="button" id="dropdownMenuLink" 
          data-toggle="dropdown" aria-haspopup="true" 
          aria-expanded="false">
            ${$(`#${that.blockInfo.id}`).css(`${paramName}`)}
          </a>

          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">`,
        params[Object.keys(params)[0]].map((entry) => {
          dropdownButtons = dropdownButtons +
          `<a class="dropdown-item" href="#">${entry}</a>`;
        }),
        isDropdownNeeded2 = `</div>
  
        </div>`
        ) : null;

      // Object.keys(params)[0] == 'options' ?
      //   params[Object.keys(params)[0]].map((entry) => {
      //     dropdownButtons = dropdownButtons +
      //     `<a class="dropdown-item" href="#">${entry}</a>`;
      //   }) : null;

      this.propsHtml = this.propsHtml +
      `<div class="param-entry">
        <h6>${paramName}</h6>
          ${isDropdownNeeded}
          ${dropdownButtons}
          ${isDropdownNeeded2}
          ${isTextInput}
          ${isSizeInput}
          ${isColorInput}

      
      </div>\n`;
    });
    this.initPropertiesLayout();
  }
}
