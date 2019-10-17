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
    this.template;
    try {
      this.loadAssets();
      this.initLayout();
      this.initTemplate();
      this.initToolbar();
    } catch (err) {
      if (environment === 'dev') {
        return Error(err);
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
    try {
      // eslint-disable-next-line prefer-const
      let toolbar = new Toolbar($('#toolbar'), this.template);
      toolbar.add(new Rectangle('Rectangle', 0, '', 'rect-tool'));
      toolbar.add(new Text('Text', 1, '', 'text-tool'));
      toolbar.initLayout();
    } catch (err) {
      if (environment === 'dev') {
        return Error(err);
      } else {
        Utils.showError(err);
      };
    }

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
  async initTemplate() {
    this.template = new Template(
        this.properties.template,
        this.properties.paths.templates
    );
  }
}
