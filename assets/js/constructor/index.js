// import  Rectangle  from "./classes/tools/rectangle";

// import Builder from './builder.js'

const workspace = new Builder($("#constructor"));

const toolbar = new Toolbar($("#toolbar"));
toolbar.toolArray.push(new Rectangle("Rectangle", 0, "", "Rectangle maker"));
console.log(toolbar);