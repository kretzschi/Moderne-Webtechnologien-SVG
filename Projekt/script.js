var svg = document.getElementById("sr005");

var csvFile ;
//Sortiert nach Tag, Zeit, Raum -> Veranstaltungsname
//z.B. timeToRoom["mon"]["10"]["006"] //"HA_Ü"
var timeToRoom;
//Sortiert nach Raum, Tag, Zeit -> Veranstaltungsname
var roomToTime;

ready = function(){
  document.getElementById("rect2985-7").onclick = function (e) {
    alert("Hello");
  }
}
window.onload = function () { 
  var fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', function(e) {
    var file = fileInput.files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        csvFile = reader.result;
        csvToObject(csvFile);
      }

      reader.readAsText(file);    
    } else {
      fileDisplayArea.innerText = "File not supported!"
    }
  });
  ready();
}

var moveSlider = function(slider) {
  var circle = document.getElementById("sr005");
  circle.setAttributeNS(null, "style" , "fill:red");
}

function csvToObject(text) {
  var line = text.split("\n");
  line.forEach(function(e, i, a) {
    var element = e.split(";");
    if (roomToTime == null) {
      roomToTime = new Object();
    }
    if (roomToTime[element[0]] == null) {
      roomToTime[element[0]] = new Object();
    }
    if (roomToTime[element[0]][element[1]] == null) {
      roomToTime[element[0]][element[1]] = new Object();
    }
    if (roomToTime[element[0]][element[1]][element[2]] == null) {
      roomToTime[element[0]][element[1]][element[2]] = new Object();
    }
    roomToTime[element[0]][element[1]][element[2]] = element[3];
    if (timeToRoom == null) {
      timeToRoom = new Object();
    }
    if (timeToRoom[element[1]] == null) {
      timeToRoom[element[1]] = new Object();
    }
    if (timeToRoom[element[1]][element[2]] == null) {
      timeToRoom[element[1]][element[2]] = new Object();
    }
    if (timeToRoom[element[1]][element[2]][element[0]] == null) {
      timeToRoom[element[1]][element[2]][element[0]] = new Object();
    }
    timeToRoom[element[1]][element[2]][element[0]] = element[3];
  });
}
