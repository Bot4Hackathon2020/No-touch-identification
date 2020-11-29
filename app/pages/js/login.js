window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

var username = document.getElementById("name");
var pwd = document.getElementById("pwd");
var box = document.getElementById("box");
var loginbutton = document.getElementById("toAdmin");


let checkpwd = function () {
    if(username.value === "admin" && pwd.value === "admin"){
        window.location = 'admin.html';
    }
    else{
        document.getElementById("warning").style.visibility = "visible";
    }
};

loginbutton.onclick = checkpwd;
