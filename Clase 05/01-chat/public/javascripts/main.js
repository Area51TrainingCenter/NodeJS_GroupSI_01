//Variables
var socket;
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
var btnDeseleccionar = document.getElementById("btnDeseleccionar");
var btnCerrar = document.getElementById("btnCerrar");

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

function fnDeseleccionar(){
	var opciones = selLista.getElementsByTagName("option");
	for(var i=0; i<opciones.length; i++) {
		opciones[i].selected=false;
	};	
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

function fnUsuarioDesconectado(usuario) {
	var opciones = selLista.getElementsByTagName("option");
	for(var i=0; i<opciones.length; i++) {
		if(opciones[i].value==usuario.id) {
			selLista.removeChild(opciones[i]);
		}
	};		
}

//Funciones de Callback de HTML
function fnLoguear(){
	socket = io();
	//Eventos de socket
	socket.on("usuario conectado", fnUsuarioConectado);
	socket.on("usuario aceptado", fnUsuarioAceptado);
	socket.on("mensaje enviado", fnMensajeRecibido);
	socket.on("usuario agregado", fnUsuarioAgregado);
	socket.on("usuario desconectado", fnUsuarioDesconectado);

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

function fnCerrar(){
	/*socket.io.close();
	form.style.display = "block";
	chat.style.display = "none";	*/
	document.location.href="/";
}

//Eventos HTML
btnIngresar.addEventListener("click", fnLoguear);
btnEnviarMensaje.addEventListener("click", fnEnviarMensaje);
btnDeseleccionar.addEventListener("click", fnDeseleccionar);
btnCerrar.addEventListener("click", fnCerrar);

