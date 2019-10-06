/**
 * Represents a builder.
 * @constructor
 * @param {jQuery} container - Container element for builder.
 */
class Builder {
    constructor(container) {
        this.container = container;
        this.layout = '';
        this.menu = '';
        this.tools = '';
        this.options = '';
        this.canvas = '';
        this.loadAssets();
        this.initLayout();
    }

    // TODO: Solution to allow loading assets asynchronously
    readFile(fileName) {
        var fileData = '';
        jQuery.ajax({
            url: fileName,
            success: function (data) {
                fileData = data;
            },
            async: false
        });
        return fileData;
    }

    // TODO: Solution to allow loading assets asynchronously
    loadAssets() {
        this.layout = this.readFile('assets/js/constructor/layout/layout.html');
        this.canvas = this.readFile('assets/js/constructor/layout/canvas.html');
        this.menu = this.readFile('assets/js/constructor/layout/menu.html');
        this.options = this.readFile('assets/js/constructor/layout/options.html');
        this.tools = this.readFile('assets/js/constructor/layout/tools.html');

        this.layout = this.layout.replace('[[ BLOCK:CANVAS ]]', this.canvas)
          .replace('[[ BLOCK:MENU ]]', this.menu)
          .replace('[[ BLOCK:OPTIONS ]]', this.options)
          .replace('[[ BLOCK:TOOLS ]]', this.tools);
    }

    initLayout() {
        
        this.container.html(this.layout);
    }

    
}

