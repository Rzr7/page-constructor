/**
 * Represents a block.
 * @constructor
 * @param {String} name - Block name.
 * @param {Array} data - Block data (html, options, etc.).
 */
class Block {
    constructor(name, data) {
        this.name = name;
        this.data = data;
    }
}