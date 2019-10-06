// import  Rectangle  from "./classes/tools/rectangle";

// import Builder from './builder.js'

const workspace = new Builder($("#constructor"));

const toolbar = new Toolbar($("#toolbar"));
toolbar.add(new Rectangle("Rectangle", 0, "", "rect"));
console.log(toolbar);