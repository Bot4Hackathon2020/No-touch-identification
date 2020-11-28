window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

const viewpic = document.getElementById("viewpic");
const {shell} = require('electron');
// const {resolve} = require('path')

viewpic.onclick = ()=>{
    var a = __dirname.lastIndexOf("\\")
    shell.openPath(__dirname.substr(0, a) + "\\py\\model\\pics");
}
