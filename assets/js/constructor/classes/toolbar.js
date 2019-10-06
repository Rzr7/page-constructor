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
        this.makeTools();
        
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

 

    makeTools() {
        
        /**
         * Maps all of the tools into their own buttons
         * 
         */
         
        // import { Rectangle } from './tools/rectangle.js'
        // const toolbar = require("./tools/rectangle.js");
   

        this.toolArray.map(tool => {
            this.toolsHtml+=
            `
            <button class="tool">`+this.toolArray[tool].toolName+`</button>
            `
        })
        console.log("Finished making tools")
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

 