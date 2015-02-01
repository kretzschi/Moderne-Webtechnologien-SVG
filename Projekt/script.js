var svg = document.getElementById("sr005");

var csvFile ;
//Sortiert nach Tag, Zeit, Raum -> Veranstaltungsname
//z.B. timeToRoom["mon"]["10"]["006"] //"HA_Ü"
var timeToRoom;
//Sortiert nach Raum, Tag, Zeit -> Veranstaltungsname
var roomToTime;

var myDebug;

var rooms = ["005", "006", "042", "044", "046", "049", "051", "053", "055"];
var times = ["10", "12", "14", "16"];
ready = function(){
  document.getElementById("rect2985-7").onclick = function (e) {
    alert("Hello");
  }
  rooms.forEach(function(e, i, a) {
    document.getElementById("sr" + e).onclick = function (evt) {
      myDebug = evt;
      var id ;
      if (evt.srcElement == null ) {
        id = evt.originalTarget.id.substr(2,4);
      } else {
        id = evt.srcElement.id.substr(2,4);
      }
      var text = "Montag \n";
      times.forEach(function(e, i, a) {
        var temp = e + ": " ;
        if (roomToTime[id]["mon"][e] == null ) {
          temp += "frei";
        } else {
          temp += roomToTime[id]["mon"][e] ;
        }
        text += temp + "\n";
      });
      text += "Dienstag \n";
      times.forEach(function(e, i, a) {
        var temp = e + ": " ;
        if (roomToTime[id]["di"][e] == null ) {
          temp += "frei";
        } else {
          temp += roomToTime[id]["di"][e] ;
        }
        text += temp + "\n";
      });

      console.log(roomToTime[id]);
      alert(text);
    }
  });
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

var setColorByAvailability = function(slider) {
  var sliderValue = slider.value
  rooms.forEach(function(room, i, a) {
        var roomSVG = document.getElementById("sr" + room);
	alert(roomToTime[room]["mon"][sliderValue]);
        if (roomToTime[room]["mon"][sliderValue] == null ) {
          roomSVG.setAttribute("style" , "fill:green");
        } else {
          roomSVG.setAttribute("style" , "fill:red");
        }
  });
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
