import Template from './template.js';
import Block from './block.js';

/**
 * Represents a toolbar.
 * @constructor
 * @param {jQuery} toolbar - toolbar.
 */
export default class Toolbar {
  constructor(toolbar, template) {
    this.toolbar = toolbar;
    this.toolsHtml = '';
    this.toolArray = [];
    this.blocksHtml = '';
    this.blocksArray = [];
    this.activeToolbarPanel;
    this.newTemplate = template;
    $('#toolbar-blocks-content').hide();
    this.actions();
    this.makeArrayOfObjects();
  }

  add(tool) {
    this.toolArray.push(tool);
    this.makeTools();
  }

  actions() {
    /**
     * Switches Block & Tools buttons, showing and hiding
     * content from different divs
     */
    $('#tools-button').click( () => {
      if ($('#blocks-button').hasClass('active')) {
        $('#tools-button').addClass('active');
        $('#toolbar-tools-content').show();
        $('#toolbar-blocks-content').hide();

        $('#blocks-button').removeClass('active');
        this.activeToolbarPanel = 'tools';
      }
    });
    $('#blocks-button').click( () => {
      if ($('#tools-button').hasClass('active')) {
        $('#blocks-button').addClass('active');
        $('#toolbar-tools-content').hide();
        $('#toolbar-blocks-content').show();
        $('#tools-button').removeClass('active');
        this.activeToolbarPanel = 'blocks';
      }
    });
  }

  readFile(fileName) {
    let fileData = '';
    jQuery.ajax({
      url: fileName,
      success: function(data) {
        fileData = data;
      },
      async: false,
    });
    return fileData;
  }

  makeArrayOfObjects() {
    /**
     * Array of Object type template.blocks
     */
    this.blocksArray = [];
    const keys = Object.keys(this.newTemplate.blocks);
    keys.map((key) => {
      this.blocksArray.push(this.newTemplate.blocks[key]);
    });
    console.log(this.blocksArray);
    this.makeBlocksHtml();
  }

  makeTools() {
    /**
     * Maps all of the tools into their own buttons
     *
     */
    this.toolsHtml = '';

    this.toolArray.map((tool) => {
      this.toolsHtml +=
          `
            <button class="tool" id="` + tool.toolId + `"></button>
            `;
    });
    // this.initLayout();
  }

  makeBlocksHtml() {
    /**
     * Maps all of the blocks into their own buttons
     *
     */
    // this.blocksHtml = '';

    this.blocksArray.map((block) => {
      this.blocksHtml +=
          `
        <div class="pcons-block-preview" id="` +
         block.data.id +
         '"><img class="pcons-block-preview-image" src="'+block.path +
         '/' + block.data.thumbnail+`" />
         <p class="pcons-block-preview-name">` + block.data.name + `</p>
         </div>`;
    });
  }

  initLayout() {
    /**
     * Replaces tools.html body with a list of "tool" buttons
     * Also replaces #toolbar-blocks-content with template blocks
     */

    $('#toolbar-tools-content').html(`
        <div>
            <!-- Tools are in HTML form here -->
            ` + this.toolsHtml + '</div>'
    );
    $('#toolbar-blocks-content').html(`
        <div>
            <!-- Blocks are in HTML form here -->
            ` + this.blocksHtml + '</div>'
    );
  }
}

