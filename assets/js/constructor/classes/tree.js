

/**
 * Workspace Tree by Martini dai Vincik
 * @param tree - jQuery request for an element with id "explorer"
 * @param selected - Selected tree node to view in Properties tab
 */

export default class Tree {
  constructor(tree) {
    this.tree = tree;
    console.log(this.tree);
    this.selected = '123';
    try {
      this.initTree();
      this.listener();
    } catch (err) {
      throw err;
    }

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
    const that = this;
    function createNode(parentNode, newNodeId, newNodeText, position) {
      $(that.tree).jstree('create_node', $(parentNode),
          {'text': newNodeText, 'id': newNodeId, position});
    };
    console.log('TREE RECIEVED', intoWhatId, block, 'ID:', id);
    const blockName = block.getAttribute('data-block');
    $(function() {
      console.log('TRYING FUNCTION');
      createNode('#p1', id, blockName, 'last');
    });
    // });
  }

  initTree() {
    const that = this;
    $(function() {
      const initData = [{
        'id': 'p1',
        'parent': '#',
        'text': 'project-name'}];
      $(that.tree).jstree({
        'core': {
          'themes': {
            'variant': 'large',
          },
          'checkCallback': true,
          'data': initData,
        },
        'checkbox': {
          'keep_selected_style': false,
        },
        'plugins': ['wholerow', 'state', 'contextmenu', 'dnd'],
        'contextmenu': {
          'items': {
            'create': {
              'label': 'Add',
              'action': function(obj) {
                $('#jstree').jstree().create_node('#',
                    { 'id': 'ajson5', 'text': 'newly added' },
                    'last', function() {
                      alert('done');
                    });
              },
            },
          },
        },
      });
    });

    // $.jstree.defaults.core.themes.variant = 'large';
  }

  listener() {
    /**
       * Listen for any events with the tree items
       */
    const that = this;
    $(function() {
      $(that.tree).on('changed.jstree', function(e, data) {
        console.log(data.selected);
        that.selected = data.selected;
      });
      $(that.tree).on('create_node.jstree', function(e, data) {
        console.log('saved');
      });
    });
    console.log('got here');
  }
}
