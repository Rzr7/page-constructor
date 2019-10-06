/**
 * @constructor
 * @param {element} toolbar - Toolbar DOM element.
 * @param {string} toolsHtml - raw HTML that is dynamically replaced with buttons
 * @param {array} toolArray - array of tools (todo) from /tools folder
 * 
 */

'use strict'
        

 class Toolbar {
    
     constructor(toolbar) {
        this.toolbar = toolbar
        this.toolsHtml = "";
        // this.toolArray = ['rect', 'select', 'circle']; // TODO: Change this to array of existing classes inside /tools
        this.toolArray=[];
        
        
     }

     readFile(fileName) {
        var fileData = '';
        jQuery.ajax({
            url: fileName,
            success: function (data) {
                fileData = data;
            },
            async: false
        });
        return fileData;
    }

    add(tool) {
        this.toolArray.push(tool);
        this.makeTools();
    }

 

    makeTools() {
        
        /**
         * Maps all of the tools into their own buttons
         * 
         */

        this.toolArray.map(tool => {
            console.log("DEBUG", tool);
            this.toolsHtml+=
            `
            <button class="tool" id="`+tool.toolTip+`">`+tool.toolName+`</button>
            ` // Later we use images to identify tools instead of names
        })
        this.initLayout();


    }

     initLayout() {
        /**
         * Replaces tools.html body with a list of "tool" buttons
         * 
         */
        this.toolbar[0].outerHTML=`
        <div>
            <!-- Tools are in HTML form here -->
            ` + this.toolsHtml + `</div>`
        ;
        

     }
     
     
 }

 