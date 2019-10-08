/**
 * @constructor
 * @param {element} toolbar - Toolbar DOM element.
 * @param {string} toolsHtml - raw HTML that is dynamically replaced with buttons
 * @param {array} toolArray - array of tools from /tools folder
 * 
 */

        

 class Toolbar {
    
     constructor(toolbar) {
        this.toolbar = toolbar
        this.toolsHtml = "";
        // this.toolArray = ['rect', 'select', 'circle']; // TODO: Change this to array of existing classes inside /tools
        this.toolArray=[];
        
        
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
        this.toolsHtml="";

        this.toolArray.map(tool => {
            this.toolsHtml+=
            `
            <button class="tool" id="`+tool.toolId+`"></button>
            ` // Later we use images to identify tools instead of names
        })

    // import { Rectangle } from './tools/rectangle.js'
    // const toolbar = require("./tools/rectangle.js");


    this.toolArray.map((tool) => {
      this.toolsHtml = this.toolsHtml +
            `
            <button class="tool">`+tool+`</button>
            `;
    });
    this.initLayout();
  }

  initLayout() {
    /**
         * Replaces tools.html body with a list of "tool" buttons
         *
         */
        console.log(this.toolbar[0])
        console.log(this.toolsHtml)
        console.log($("#toolbar"))
        $("#toolbar")[0].outerHTML=`
        <div>
            <!-- Tools are in HTML form here -->
            ` + this.toolsHtml + '</div>'
    ;
  }
}

