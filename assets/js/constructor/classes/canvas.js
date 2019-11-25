
export default class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.blockList = [];
  }

  updateBlockList(newList) {
    this.blockList = newList;
    // console.log('New blocklist:', this.blockList);
  }

  addToList(blockObject) {
    // eslint-disable-next-line no-var
    var list = this.blockList;
    list.push(blockObject);
    this.updateBlockList(list);
  }
}
