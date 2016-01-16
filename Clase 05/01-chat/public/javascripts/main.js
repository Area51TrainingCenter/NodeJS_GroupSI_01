//Variables
var socket = io();
var log = document.getElementById("log");
var txtUsuario = document.getElementById("txtUsuario");
var btnIngresar = document.getElementById("btnIngresar");

//Funciones de Callback de Socket
function fnUsuarioConectado(){
	log.innerHTML += "Usuario conectado<br>";
}

//Funciones de Callback de HTML
function fnLoguear(){
	var nombreUsuario = txtUsuario.value.trim();
	if(nombreUsuario!="") {
		socket.emit("nombre usuario", nombreUsuario);	
	}
}

//Eventos HTML
btnIngresar.addEventListener("click", fnLoguear);

//Eventos de socket
socket.on("usuario conectado", fnUsuarioConectado);