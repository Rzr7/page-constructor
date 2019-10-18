// import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less'; // CSS or LESS
import fancytree from 'jquery.fancytree';
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd5';
import 'jquery.fancytree/dist/modules/jquery.fancytree.glyph';
import 'jquery.fancytree/dist/modules/jquery.fancytree.table';
import 'jquery.fancytree/dist/modules/jquery.fancytree.wide';

console.log('Fancy tree #'+fancytree.version);

/**
 * Workspace Tree by Martini dai Vincik
 * @param tree - jQuery request for an element with id "explorer"
 * @param selected - Selected tree node to view in Properties tab
 */

export default class Tree {
  constructor(tree) {
    this.tree = tree;
    this.selected = '123';
    this.initTree();
    this.rootNode;

    console.log('Tree initiated successfully');
  }

  static addItem(intoWhatId, block, id) {
    /**
     * this will be used to add items into other items.
     * Connect them with id
     * @param intoWhatId - is the tree entry,
     * inside of which a new element will be added
     * @param block - a whole block to manipulate info
     */

    console.log('TREE RECIEVED', intoWhatId, block, 'ID:', id);
    const blockName = block.getAttribute('data-block');
    // console.log('EXISTS?', this.rootNode);
    $('#explorer-tree').fancytree('getTree').getNodeByKey('1')
        .addChildren({
          title: blockName,
          tooltip: 'what?',
        });
  }

  initTree() {
    /**
     * Initialize a tree view
     */
    const that = this;
    $('#explorer-tree').fancytree({
      extensions: ['dnd5', 'edit', 'glyph', 'wide'],
      glyph: {
        preset: 'bootstrap3',
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
      icon: function(event, data) {
        // if( data.node.isFolder() ) {
        //   return "glyphicon glyphicon-book";
        // }
      },
      source: [
        {title: 'project-name', key: '1',
          expanded: true},
      ],
    });
  };
}
