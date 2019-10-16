import Template from './classes/template.js';
import layout from './layout/layout.html';
import canvas from './layout/canvas.html';
import menu from './layout/menu.html';
import options from './layout/options.html';
import toolbarHtml from './layout/toolbar.html';
import Toolbar from './classes/toolbar';
/**
 * Represents a builder.
 * @constructor
 * @param {jQuery} container - Container element for builder.
 */
export default class Builder {
  constructor(container) {
    this.container = container;
    this.layout = layout;
    this.menu = menu;
    this.toolbarHtml = toolbarHtml;
    this.options = options;
    this.canvas = canvas;
    this.template = {};
    this.loadAssets();
    this.initLayout();
    this.initTemplate();

    this.initToolbar();
  }

  /**
   * Tools are added by calling in a new class on toolbar.add(*)
   * @params : Tool name | Index | Image | Tool ID
   * Index is used to change order in which tools are displayed (WIP)
   * Image is stored in assets/src/images and are all 64x64 (mby change later?)
   * Tool ID is a unique ID for the tool
   */
  initToolbar() {
    const toolbar = new Toolbar($('#toolbar'));
    toolbar.add(new Rectangle('Rectangle', 0, '', 'rect-tool'));
    toolbar.add(new Text('Text', 1, '', 'text-tool'));
    toolbar.initLayout();
  }

  loadAssets() {
    this.layout = this.layout.replace('[[ BLOCK:CANVAS ]]', this.canvas)
        .replace('[[ BLOCK:MENU ]]', this.menu)
        .replace('[[ BLOCK:OPTIONS ]]', this.options)
        .replace('[[ BLOCK:TOOLBAR ]]', this.toolbarHtml);
  }

  initLayout() {
    this.container.html(this.layout);
  }

  initTemplate() {
    this.template = new Template('initial_template');
  }
}
