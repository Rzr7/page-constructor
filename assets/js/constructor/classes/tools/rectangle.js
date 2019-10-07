/**
* @constructor
* @param toolName - tool name
* @param index - tool's position in toolbar
*/
'use strict';

export class Rectangle {
  constructor(toolName, index, image, toolTip) {
    this.toolName = toolName;
    this.index = index;
    this.image = image;
    this.toolTip = toolTip;
  }

  addToCanvas() {
    // Adds HTML to canvas if tool is selected and drawn on canvas
    this.canvasHtml = '';
  }

  init() {
    // Initializes itself on the toolbar

  }
}
