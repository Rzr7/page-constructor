/**
 * Represents a toolbar.
 * @constructor
 * @param {jQuery} toolbar - toolbar.
 */
export default class Toolbar {
  constructor(toolbar) {
    this.toolbar = toolbar;
    this.toolsHtml = '';
    this.toolArray = [];
    this.activeToolbarPanel;
    $('#toolbar-options-content').hide();

    this.actions();
  }

  add(tool) {
    this.toolArray.push(tool);
    this.makeTools();
  }

  actions() {
    $('#tools-button').click( () => {
      if ($('#options-button').hasClass('active')) {
        $('#tools-button').addClass('active');
        $('#toolbar-tools-content').show();
        $('#toolbar-options-content').hide();

        $('#options-button').removeClass('active');
        this.activeToolbarPanel = 'tools';
      }
      console.log(this.activeToolbarPanel);
    });
    $('#options-button').click( () => {
      if ($('#tools-button').hasClass('active')) {
        $('#options-button').addClass('active');
        $('#toolbar-tools-content').hide();
        $('#toolbar-options-content').show();
        $('#tools-button').removeClass('active');
        this.activeToolbarPanel = 'options';
      }
      console.log(this.activeToolbarPanel);
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

  initLayout() {
    /**
     * Replaces tools.html body with a list of "tool" buttons
     *
     */

    $('#toolbar-tools-content').html(`
        <div>
            <!-- Tools are in HTML form here -->
            ` + this.toolsHtml + '</div>'
    );
  }
}

