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
import 'jquery-ui-bundle';

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
      this.initTemplate();
      this.loadAssets();
      this.initLayout();
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
  }

  /**
   * Loading html content to layout variables
   */
  loadAssets() {
    const stylesLink = '<link rel="stylesheet" href="' +
      this.template.getStyles() + '" />';
    this.layout = stylesLink + this.layout;
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

  /**
   * Drag and drop initializer.
   * Sets up draggable elements and areas.
   */
  initDragAndDrop() {
    const that = this;
    $('.canvas').sortable({
      revert: true,
      cursor: 'move',
      containment: 'parent',
      forcePlaceholderSize: true,
      opacity: .4,
      revertDuration: 100,
      placeholder: 'placeholder',
      start: function(e, ui) {
        ui.placeholder.css('opacity', .6);
        ui.placeholder.html(ui.item.html());
      },
    });
    $('.pcons-block-preview').draggable({
      connectToSortable: '.canvas',
      revert: 'invalid',
      cursor: 'move',
      cursorAt: { top: -12, left: -20 },
      helper: function( event ) {
        const blockId = event.currentTarget.getAttribute('data-block');
        return that.template.getBlockHtml(blockId);
      },
      revertDuration: 100,
      tolerance: 'pointer',
      forcePlaceholderSize: true,
    });

    $('.pcons-block-preview').disableSelection();
  }
}
