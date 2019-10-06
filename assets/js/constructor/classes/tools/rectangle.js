/** 
* @constructor
* @param toolName - tool name 
* @param index - tool's position in toolbar
*/

 class Rectangle {
    constructor(toolName, index, image, toolTip) {
        this.toolName = toolName;
        this.index = index;
        this.image = image;
        this.toolTip = toolTip;
        this.init();
    }

   

    addToCanvas() {
        // Adds HTML to canvas if tool is selected and drawn on canvas
        this.canvasHtml = ``;
    }

    init() {
        // Initializes itself on the toolbar and reacts to clicks

        $(document).ready(() => {
            $("#"+this.toolTip).click(() => {
            console.log("User clicked on" + this.toolName)
            })
        })
        
    }

    action() {
        console.log("Works")
    }


}