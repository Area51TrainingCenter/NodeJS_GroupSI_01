var socket = io();

//Variables
var enMovimiento = false;

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

//Crear botón de borrado
var boton = document.createElement("button");
boton.style.width = "100%";
boton.style.height = "50px";
var txt = document.createTextNode("Limpiar pantalla");
boton.appendChild(txt);

contenedor.appendChild(boton);




//Callbacks Eventos
function fnEventoCanvas(e){
	var posicionMouseEnCanvasX = e.layerX,
		posicionMouseEnCanvasY = e.layerY;

	switch(e.type) {
		case "mousedown":
			contexto.beginPath();
			contexto.moveTo(posicionMouseEnCanvasX, posicionMouseEnCanvasY);
			enMovimiento = true;
			socket.emit("trazo", posicionMouseEnCanvasX, posicionMouseEnCanvasY, e.type);
			break;
		case "mousemove":
			if(enMovimiento) {
				contexto.lineTo(posicionMouseEnCanvasX, posicionMouseEnCanvasY);
				contexto.stroke();
				socket.emit("trazo", posicionMouseEnCanvasX, posicionMouseEnCanvasY, e.type);
			}
			break;
		case "mouseup":
			contexto.closePath();
			enMovimiento = false;
			socket.emit("trazo", posicionMouseEnCanvasX, posicionMouseEnCanvasY, e.type);
			break;
	};
}

function fnLimpiarPantalla(){
	contexto.clearRect(0, 0, 800, 600);
	socket.emit("accion", "borrar pantalla");
}

//Eventos
canvas.addEventListener("mousedown", fnEventoCanvas);
canvas.addEventListener("mousemove", fnEventoCanvas);
canvas.addEventListener("mouseup", fnEventoCanvas);

boton.addEventListener("click", fnLimpiarPantalla);