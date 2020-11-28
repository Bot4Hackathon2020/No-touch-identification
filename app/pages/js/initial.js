window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

var toUser = document.getElementById("toUser"); 
var toLogin = document.getElementById("toLogin");
var reset = document.getElementById("reset");
var description = document.getElementById("description");
toUser.onclick=function() {
    window.location="user.html"
};
toLogin.onclick=function() {
    window.location="login.html"
};
reset.onclick=function() {
    window.location="../index.html"
};
description.onclick=function() {
    window.location="description.html"
};