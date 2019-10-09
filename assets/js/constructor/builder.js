import Toolbar from './classes/toolbar.js';
import layout from './layout/layout.html';
import canvas from './layout/canvas.html';
import menu from './layout/menu.html';
import options from './layout/options.html';
import toolbar from './layout/toolbar.html';

/**
 * Represents a builder.
 * @constructor
 * @param {jQuery} container - Container element for builder.
 */
export default class Builder {
  constructor(container) {
    this.container = container;
    this.layout = '';
    this.menu = '';
    this.toolbar = '';
    this.options = '';
    this.canvas = '';
    this.loadAssets();
    this.initLayout();
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
    this.layout = layout;
    this.canvas = canvas;
    this.menu = menu;
    this.options = options;
    this.toolbar = toolbar;

    this.layout = this.layout.replace('[[ BLOCK:CANVAS ]]', this.canvas)
        .replace('[[ BLOCK:MENU ]]', this.menu)
        .replace('[[ BLOCK:OPTIONS ]]', this.options)
        .replace('[[ BLOCK:TOOLBAR ]]', this.toolbar);
  }

  initLayout() {
    this.container.html(this.layout);
  }
}
