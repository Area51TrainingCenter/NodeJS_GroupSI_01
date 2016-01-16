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

var inicioDibujo = false;

//Funciones Callback HTML
function fnArrastre(e) {
	var tipo = e.type;
	var posX = e.layerX,
		posY = e.layerY;	

	switch(tipo) {
		case "mousedown":
			contexto.beginPath();
			contexto.moveTo(posX, posY);
			inicioDibujo = true;		
			socket.emit("trazo", posX, posY, e.type);					
			break;
		case "mousemove":
			if(inicioDibujo) {
				contexto.lineTo(posX, posY);
				contexto.stroke();
				socket.emit("trazo", posX, posY, e.type);
			}		
			break;
		case "mouseup":
			contexto.closePath();
			inicioDibujo = false;
			socket.emit("trazo", posX, posY, e.type);					
			break;
	};


}


//Eventos HTML
canvas.addEventListener("mousedown", fnArrastre);
canvas.addEventListener("mousemove", fnArrastre);
canvas.addEventListener("mouseup", fnArrastre);