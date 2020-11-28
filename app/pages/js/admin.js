window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

const viewpic = document.getElementById("viewpic");
const {shell} = require('electron');

viewpic.onclick = ()=>{
    shell.openPath("C:\\Users\\DRACO\\WebstormProjects\\No-touch-identification\\app\\py\\model\\pics\\1606568385.8680809.jpg");
}
