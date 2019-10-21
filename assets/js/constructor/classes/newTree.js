// import 'jquery.fancytree/dist/skin-lion/ui.fancytree.less'; // CSS or LESS
import fancytree from 'jquery.fancytree';
import 'jquery.fancytree/dist/modules/jquery.fancytree.edit';
import 'jquery.fancytree/dist/modules/jquery.fancytree.filter';
import 'jquery.fancytree/dist/modules/jquery.fancytree.dnd5';
import 'jquery.fancytree/dist/modules/jquery.fancytree.glyph';
import 'jquery.fancytree/dist/modules/jquery.fancytree.table';
import 'jquery.fancytree/dist/modules/jquery.fancytree.wide';
import Utils from './utils';

/**
 * Workspace Tree by Martini dai Vincik
 * @param tree - jQuery request for an element with id "explorer"
 * @param selected - Selected tree node to view in Properties tab
 * @var hierarchy - an array of blocks in order (wip)
 */

export default class Tree {
  constructor(tree) {
    this.tree = tree;
    this.hierarchy = [];
    this.selected = '123';
    this.newestBlock;
    this.htmlArr;
    this.treeArr;
    this.tempList = {};
    this.initTree();
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

    try {
      /**
       * Check if block has been dragged from the templates tab
       * if not (re-sorted), isn't being added into explorer tree
       */
      console.log('ADDITEM', intoWhatId, block, blockName, id);
      const toPush = {title: blockName, key: id, parent: intoWhatId};
      this.newestBlock = toPush;
      console.log('verify before sort');
      console.log(this.htmlArr);
      console.log(this.treeArr);
      // this.tempList.assign(this.tempList, toPush);
      this.sortTree();
      $(block).removeAttr('draggedblock');
    } catch (err) {
      throw err;
    }
  }

  catchArrays(array1, array2) {
    console.log(array1, array2);
    this.htmlArr = array1;
    this.treeArr = array2;
  }

  setCanvasChildren(array) {
    this.hierarchy = array;
    // this.updateTree();
    console.log('SetCanvasChildren array', array);
  }

  /**
   * Tree recieves info what it should look like
   * and compares to what it contains now.
   * if it was in-canvas sorting - replace layout,
   * if it was a new block added - first add it,
   * then compare again
   *
 * @param {Array} htmlArr - is actual canvas array with divs (Block.html)
 * @param {Array} treeArr - needs update, always being sorted last
 */
  sortTree() {
    console.log('-------DEBUG-------');
    console.log('treeArr', this.treeArr, '/n/nhtmlArr', this.htmlArr );
    const expectedResult = {};
    let i = 0;
    if (this.hierarchy.length > 0) {
      this.hierarchy.map((item) => {
        expectedResult[i] = item;
        i++;
      });
    }
    console.log($('#'+this.newestBlock.key));
    console.log('THIS NEWEST', this.newestBlock, $('#'+this.newestBlock.key) );
    console.log('DOES IT ECEN EXIST?!?', this.newestBlock.key);
    if ($('#'+this.newestBlock.key).attr('draggedblock')) {
      console.log('EXP', expectedResult);
      expectedResult[expectedResult.length] = this.newestBlock;
    }
    console.log('expectedResult', expectedResult);

    console.log('Applying patch with following content:', this.treeArr);
    // const toPass = {0: this.treeArr};
    const that = this;
    const treearray = this.treeArr;
    const entries = [];
    for (let i = 0; i < Object.keys(treearray).length; i++) {
      const currentWord = treearray[Object.keys(treearray)[i]];
      entries.push(currentWord);
    }
    console.log('ENTRIES', entries);
    // $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas')
    //     .applyPatch([
    //       {title: 'project-name',
    //         key: 'canvas',
    //         folder: true,
    //         expanded: true,

    //       },
    //       this.treeArr]);
    // $('#explorer-tree').fancytree('getTree').
    //     getNodeByKey('canvas').children = entries;
    console.log($('#explorer-tree').fancytree('getTree').
        getNodeByKey('canvas').applyPatch({title: 'project-name',
          key: 'canvas',
          folder: true,
          expanded: true,

        },
        this.treeArr));
    $('#explorer-tree').fancytree('getTree').reload(false);

    $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas').
        setExpanded(true);
    // console.log('-------DEBUG-------');
  }

  addNode(title, key) {
    //
  }

  updateTree() {
    // $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas')
    //     .removeChildren();
    // $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas')
    //     .addChildren(this.hierarchy);
    // $('#explorer-tree').fancytree('getTree').getNodeByKey('canvas').
    //     setExpanded(true);
    // this.sortTree(null, this.hierarchy);
  }

  initTree() {
    /**
     * Initialize a tree view
     */
    const that = this;
    $(function() {
      $('#explorer-tree').fancytree({
        extensions: ['dnd5', 'edit', 'glyph', 'wide'],
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
            folder: true,
            expanded: true,
            children: that.hierarchy }],

      });
    });
  };
}
