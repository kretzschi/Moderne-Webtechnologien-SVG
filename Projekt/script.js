var svg = document.getElementById("sr005");

ready = function(){
    document.getElementById("rect2985-7").onclick = function (e) {
        alert("Hello");
    }
}
window.onload = function () { ready();}

var moveSlider = function(slider) {
	var circle = document.getElementById("sr005");
	circle.setAttributeNS(null, "style" , "fill:red");
}
