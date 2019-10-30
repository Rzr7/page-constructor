// import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less'; // CSS or LESS
import fancytree from 'jquery.fancytree';
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd5';
import 'jquery.fancytree/dist/modules/jquery.fancytree.glyph';
import 'jquery.fancytree/dist/modules/jquery.fancytree.table';
import 'jquery.fancytree/dist/modules/jquery.fancytree.wide';
import Builder from '../builder';

// console.log('Fancy tree #'+fancytree.version);

/**
 * Workspace Tree by Martini dai Vincik
 * @param tree - jQuery request for an element with id "explorer"
 * @param selected - Selected tree node to view in Properties tab
 * @var hierarchy - an array of blocks in order (wip)
 */

export default class Tree {
  constructor(tree, builder) {
    this.tree = tree;
    this.hierarchy = [];
    this.builder = builder;
    this.selected = '123';
    this.initTree();

    // console.log('Tree initiated successfully');
  }

  addItem(intoWhatId, block, blockName, id) {
    /**
     * this will be used to add items into other items.
     * Connect them with id
     * @param intoWhatId - is the tree entry,
     * inside of which a new element will be added
     * @param block - a whole $ block to manipulate info
     * @param blockName - block's folder name e.g. title-1, header-1
     * @param id - Block final id (with ~#3241 extensions)
     */
    // console.log($('#explorer-tree').fancytree());

    // console.log('TREE RECIEVED', intoWhatId, block, blockName, 'ID:', id);
    // console.log(this.hierarchy);
    try {
      /**
       * Check if block has been dragged from the templates tab
       * if not (re-sorted), isn't being added into explorer tree
       */
      this.hierarchy.push({title: blockName, key: id});
      $(block).removeAttr('draggedblock');
    } catch (err) {
      throw err;
    }
  }

  setCanvasChildren(array) {
    // console.log('UPDATING TREE WITH', array);
    this.hierarchy = array;
    this.updateTree();
  }


  showSelectedProperties() {
    console.log($('#explorer-tree').fancytree('getTree').getSelectedNodes());
  }


  updateTree() {
    // $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas')
    //     .removeChildren();
    // $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas')
    //     .addChildren(this.hierarchy);
    // $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas').
    //     setExpanded(true);
    $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas')
        .applyPatch({
          key: 'canvas',
          title: 'project-name',
          // toggleEffect: false,
          folder: true,
          // expanded: true,
          children: this.hierarchy});
    $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas').
        setExpanded(true);
  }

  initTree() {
    /**
     * Initialize a tree view
     */
    const that = this;
    $(function() {
      $('#explorer-tree').fancytree({
        extensions: ['dnd5', 'glyph'],
        glyph: {
          preset: 'awesome4',
          map: {
            doc: 'fa fa-file-o',
            docOpen: 'fa fa-file-o',
            checkbox: 'fa fa-square-o',
            checkboxSelected: 'fa fa-check-square-o',
            checkboxUnknown: 'fa fa-square',
            dragHelper: 'fa arrow-right',
            dropMarker: 'fa long-arrow-right',
            error: 'fa fa-warning',
            expanderClosed: 'fa fa-caret-right',
            expanderLazy: 'fa fa-angle-right',
            expanderOpen: 'fa fa-caret-down',
            folder: 'fa fa-folder-o',
            folderOpen: 'fa fa-folder-open-o',
            loading: 'fa fa-spinner fa-pulse',
          },
        },
        source: [
          {title: 'project-name',
            key: 'canvas',
            toggleEffect: false,
            folder: true,
            expanded: true,
            children: that.hierarchy }],

        activate: function(event, data) {
          console.log(event, data);
          that.builder.updateProperties(data.node.data.id);
        },

      });
    });
  };
}
