var socket = io();

//Selección de elementos
var contenedor = document.getElementsByTagName("article")[0];

//Crear canvas
var canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;

var contexto = canvas.getContext("2d");
contexto.fillStyle = "#f00";
contexto.strokeStyle = "#f00";
contexto.lineWidth = "2px";

//Agregar canvas a la página web
contenedor.appendChild(canvas);

//Eventos de socket
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
	}
}

function fnEjecutarAccion(accion) {
	switch(accion) {
		case "borrar pantalla":
			contexto.clearRect(0, 0, 800, 600);
			break;
	}
}


//Eventos
socket.on("dibujar en canvas", fnDibujar);
socket.on("ejecutar accion", fnEjecutarAccion);