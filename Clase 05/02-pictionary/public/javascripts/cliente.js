//Referencias
var socket = io();

var article = document.getElementsByTagName("article")[0];
var canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;

var contexto = canvas.getContext("2d");
contexto.fillStyle = "#f00";
contexto.strokeStyle = "#f00";
contexto.lineWidth = "1px";

article.appendChild(canvas);


//Funciones Callback Socket
function fnDibujar(x, y, tipo) {
	switch(tipo) {
		case "mousedown":
			contexto.beginPath();
			contexto.moveTo(x, y);
			break;
		case "mousemove":
			contexto.lineTo(x, y);
			contexto.stroke();	
			break;
		case "mouseup":
			contexto.closePath();
			break;
	};
}

socket.on("trazo hecho", fnDibujar);


