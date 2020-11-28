window.onload = function() { document.body.className = ''; }
window.ontouchmove = function() { return false; }
window.onorientationchange = function() { document.body.scrollTop = 0; }

var toAdmin = document.getElementById("toAdmin");

var name = document.getElementById("name");
var pwd = document.getElementById("pwd");
var box = document.getElementById("box");
var loginbutton = document.getElementById("toAdmin");

loginbutton.onclick = ()=> {

    if (name.name.value === "admin" && pwd.name.value === "admin") {
        alert("欢迎");
        window.location="admin.html"
    } else {
        alert("密码错误")
    }
}