//Variables
var socket = io();
var usuarioLogueado = false;
var log = document.getElementById("log");
var txtUsuario = document.getElementById("txtUsuario");
var btnIngresar = document.getElementById("btnIngresar");
var chat = document.getElementById("chat");
var form = document.getElementsByTagName("form")[0];
var txtMensajes = document.getElementById("txtMensajes");
var txtInputMensaje = document.getElementById("txtInputMensaje");
var btnEnviarMensaje = document.getElementById("btnEnviarMensaje");
var selLista = document.getElementById("selLista");

//Funciones extras
function fnUsuarioSeleccionado(){
	var opciones = selLista.getElementsByTagName("option");
	for(var i=0; i<opciones.length; i++) {
		if(opciones[i].selected) {
			return opciones[i].value;
		}
	};

	return "";
}

//Funciones de Callback de Socket
function fnUsuarioConectado(){
	log.innerHTML += "Usuario conectado<br>";
}

function fnUsuarioAceptado(lista){
	form.style.display = "none";
	chat.style.display = "block";

	for(var i=0; i<lista.length; i++) {
		var option = document.createElement("option");
		option.value = lista[i].id;
		//<option value='xkxkx'></option>
		var texto = document.createTextNode(lista[i].nombre);
		option.appendChild(texto);

		selLista.appendChild(option);
	}	

	usuarioLogueado = true;
}

function fnUsuarioAgregado(datos){
	if(usuarioLogueado) {
		var option = document.createElement("option");
		option.value = datos.id;
		var texto = document.createTextNode(datos.nombre);
		option.appendChild(texto);	

		selLista.appendChild(option);		
	}
}

//Funciones de Callback de HTML
function fnLoguear(){
	var nombreUsuario = txtUsuario.value.trim();
	if(nombreUsuario!="") {
		socket.emit("nombre usuario", nombreUsuario);	
	}
}

function fnEnviarMensaje(){
	var mensaje = txtInputMensaje.value.trim();
	if(mensaje){
		txtMensajes.value += mensaje + String.fromCharCode(13);
		socket.emit("mensaje usuario", mensaje, fnUsuarioSeleccionado());
	}
}

function fnMensajeRecibido(mensaje){
	txtMensajes.value += mensaje + String.fromCharCode(13);
}

//Eventos HTML
btnIngresar.addEventListener("click", fnLoguear);
btnEnviarMensaje.addEventListener("click", fnEnviarMensaje);

//Eventos de socket
socket.on("usuario conectado", fnUsuarioConectado);
socket.on("usuario aceptado", fnUsuarioAceptado);
socket.on("mensaje enviado", fnMensajeRecibido);
socket.on("usuario agregado", fnUsuarioAgregado);