import Template from './classes/template.js';
import Utils from './classes/utils.js';
import layout from './layout/layout.html';
import canvas from './layout/canvas.html';
import menu from './layout/menu.html';
import options from './layout/options.html';
import toolbar from './layout/toolbar.html';


/**
 * Represents a builder.
 * @constructor
 * @param {jQuery} container - Container element for builder.
 * @param {Object} properties - Builder options comes from initializer.
 */
export default class Builder {
  constructor(container, properties = {}) {
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
    this.toolbar = toolbar;
    this.options = options;
    this.canvas = canvas;
    this.template = {};
    try {
      this.loadAssets();
      this.initLayout();
      this.initToolbar();
      this.initTemplate();
    } catch (err) {
      Utils.showError(err);
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
    /*
    const toolbar = new Toolbar($('#toolbar'));
    toolbar.add(new Rectangle('Rectangle', 0, '', 'rect-tool'));
    toolbar.add(new Text('Text', 1, '', 'text-tool'));
    toolbar.initLayout();
    */
  }

  /**
   * Loading html content to layout variables
   */
  loadAssets() {
    this.layout = this.layout.replace('[[ BLOCK:CANVAS ]]', this.canvas)
        .replace('[[ BLOCK:MENU ]]', this.menu)
        .replace('[[ BLOCK:OPTIONS ]]', this.options)
        .replace('[[ BLOCK:TOOLBAR ]]', this.toolbar);
  }

  /**
   * Set container html with layout
   */
  initLayout() {
    this.container.html(this.layout);
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
}
