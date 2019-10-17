/**
 * Workspace Tree by Martini dai Vincik
 * @param tree - jQuery request for an element with id "explorer"
 * @param selected - Selected tree node to view in Properties tab
 */

export default class Tree {
  constructor(tree) {
    this.tree = tree;
    this.selected = '123';
    try {
      this.initTree();
      this.listener();
    } catch (err) {
      throw err;
    }

    console.log('Tree initiated successfully');
  }

  static addItem(intoWhatId, selfId, properties = {}) {
    /**
     * this will be used to add items into other items.
     * Connect them with id
     * @param intoWhatId - is the tree entry,
     * inside of which a new element will be added
     * @param selfId - ID of block that is added
     * @param properties - WIP
     */
  }

  initTree() {
    $(function() {
      $('#explorer-tree').jstree({
        'core': {
          'themes': {
            'variant': 'large',
          },
          'checkCallback': true,
        },
        'checkbox': {
          'keep_selected_style': false,
        },
        'plugins': ['wholerow'],
      });
    });
    $.jstree.defaults.core.themes.variant = 'large';
  }

  listener() {
    /**
       * Listen for any events with the tree items
       */
    const that = this;
    $(function() {
      $('#explorer-tree').on('changed.jstree', function(e, data) {
        console.log(data.selected);
        that.selected = data.selected;
      });
    });
  }
}
