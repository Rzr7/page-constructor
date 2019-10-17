import Template from './classes/template.js';
import Utils from './classes/utils.js';
import layout from './layout/layout.html';
import canvas from './layout/canvas.html';
import menu from './layout/menu.html';
import options from './layout/options.html';
import toolbarHtml from './layout/toolbar.html';
import Toolbar from './classes/toolbar';
import Rectangle from './classes/tools/rectangle.js';
import Text from './classes/tools/text.js';
import Tool from './classes/tools/tool.js';

// import { Draggable } from '@shopify/draggable';
import Draggable from '@shopify/draggable/lib/draggable';

const environment = 'dev';
/**
 * Represents a builder.
 * @constructor
 * @param {jQuery} container - Container element for builder.
 * @param {Object} properties - Builder options comes from initializer.
 */
export default class Builder {
  constructor(container, properties) {
    this.properties = {
      template: properties.template.length ?
        properties.template :
        'initial_template',
      paths: {
        templates: properties.paths.templates.length ?
          properties.paths.templates :
          '/templates',
      },
    };
    this.container = container;
    this.layout = layout;
    this.menu = menu;
    this.toolbarHtml = toolbarHtml;
    this.options = options;
    this.canvas = canvas;
    this.template = {};
    this.toolbar = {};
    try {
      this.loadAssets();
      this.initLayout();
      this.initTemplate();
      this.initToolbar();
      this.initDragAndDrop();
    } catch (err) {
      if (environment === 'dev') {
        throw err;
      } else {
        Utils.showError(err);
      }
    }
  }

  /**
   * Tools are added by calling in a new class on toolbar.add(*)
   * @params : Tool name | Index | Image | Tool ID
   * Index is used to change order in which tools are displayed (WIP)
   * Image is stored in assets/src/images and are all 64x64 (mby change later?)
   * Tool ID is a unique ID for the tool
   */

  initToolbar() {
    this.toolbar = new Toolbar($('#toolbar'), this.template);
    this.toolbar.add(new Rectangle('Rectangle', 0, '', 'rect-tool'));
    this.toolbar.add(new Text('Text', 1, '', 'text-tool'));
    this.toolbar.initLayout();

    console.log('init toolbar');
  }

  /**
   * Loading html content to layout variables
   */
  loadAssets() {
    this.layout = this.layout.replace('[[ BLOCK:CANVAS ]]', this.canvas)
        .replace('[[ BLOCK:MENU ]]', this.menu)
        .replace('[[ BLOCK:OPTIONS ]]', this.options)
        .replace('[[ BLOCK:TOOLBAR ]]', this.toolbarHtml);
  }

  /**
   * Set container html with layout
   */
  initLayout() {
    this.container[0].innerHTML = this.layout;
  }

  /**
   * Load initial template using constructor properties
   */
  initTemplate() {
    this.template = new Template(
        this.properties.template,
        this.properties.paths.templates
    );
  }

  initDragAndDrop() {
    const draggable = new Draggable($('#constructor')[0], {
      draggable: '.pcons-block-preview',
    });
    draggable.on('drag:start', () => console.log('drag:start'));
    draggable.on('drag:move', () => console.log('drag:move'));
    draggable.on('drag:stop', () => console.log('drag:stop'));
  }
}
