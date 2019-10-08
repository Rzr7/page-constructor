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
  }

  add(tool) {
    this.toolArray.push(tool);
    this.makeTools();
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

    $('#toolbar')[0].outerHTML = `
        <div>
            <!-- Tools are in HTML form here -->
            ` + this.toolsHtml + '</div>'
    ;
  }
}

