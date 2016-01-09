var socket = io();
var conectado = false;

//Componentes
var txtUsuario = document.getElementById("txtUsuario");
var btnLoguear = document.getElementById("btnLoguear");
var formLogin =  document.getElementById("formLogin");
var zonaLog =  document.getElementById("zonaLog");
var formChat = document.getElementById("formChat");
var txtMensajes = document.getElementById("txtMensajes");
var txtMensajeChat = document.getElementById("txtMensajeChat");
var btnEnviarMensaje = document.getElementById("btnEnviarMensaje");
var selLista = document.getElementById("selLista");
var btnDesloguear = document.getElementById("btnDesloguear");
var btnDeseleccionar = document.getElementById("btnDeseleccionar");


//Funciones
function limpiarControles(){
	txtUsuario.value = "";
	txtMensajes.value = "";
	txtMensajeChat.value = "";
	selLista.innerHTML = "";
	zonaLog.innerHTML = "";
}

function ocultarControl(ctrl){
	ctrl.style.display = "none";
}

function mostrarControl(ctrl){
	ctrl.style.display = "block";
}

function loggin(texto) {
	var li = document.createElement("li");
	li.innerHTML = texto;

	zonaLog.appendChild(li)
}

function escribirMensaje(mensaje) {
	txtMensajes.value += (mensaje + String.fromCharCode(13));
}

function fnActualizarListaUsuarios(item, accion){
	if(accion==1) {
		var option = document.createElement("option");
		option.value = item.id;

		txt = document.createTextNode(item.usuario);

		option.appendChild(txt);

		selLista.appendChild(option);
	}

	if(accion==0) {
		var opciones = selLista.getElementsByTagName("option");
		for(var i=0; i<opciones.length; i++) {
			if(opciones[i].value==item.id) {
				selLista.removeChild(opciones[i]);
				i--;
			}
		};		
	}

}

function fnUsuarioSeleccionado() {
	var opciones = document.getElementsByTagName("option");
	var usuarioSeleccionado = "";
	for(var i=0; i<opciones.length; i++) {
		if(opciones[i].selected) {
			usuarioSeleccionado = opciones[i].value;
		}
	}

	return usuarioSeleccionado;
}

//Eventos elementos DOM
function fnLoguear(e) {
	var usuario = txtUsuario.value.trim();
	if(usuario) {
		socket.emit("usuario agregar", usuario);
	}
}

function fnEnviarMensaje(e){
	var mensaje = txtMensajeChat.value.trim();
	if(mensaje) {
		escribirMensaje(mensaje);
		txtMensajeChat.value = "";

		socket.emit("enviar mensaje", mensaje, fnUsuarioSeleccionado());
	}
}

function fnDeseleccionar(){
	var opciones = document.getElementsByTagName("option");	
	for(var i=0; i<opciones.length; i++) {
		opciones[i].selected = false;
	}
}

//Callbacks
function fnLogueado(usuario){
	limpiarControles();
	ocultarControl(formLogin);
	mostrarControl(formChat);

	loggin("Bienvenid@ " +usuario);
	conectado = true;
}

function fnMensajeEnviado(mensaje) {
	escribirMensaje(mensaje);
}

function fnNuevoUsuario(usuario, id) {
	if(conectado) {
		fnActualizarListaUsuarios({usuario: usuario, id: id}, 1);
		loggin("Se ha conectado '" + usuario + "'");
	}
}

function fnUsuarioDesconectado(usuario, id) {
	if(usuario && conectado) {
		fnActualizarListaUsuarios({usuario: usuario, id: id}, 0);
		loggin("Se ha desconectado '" + usuario + "'");	
	}
}

function fnListaUsuarios(usuarios) {
	var lista = usuarios.lista;
	for(var i=0; i<lista.length; i++) {
		fnActualizarListaUsuarios(lista[i], 1);
	}
}

function fnDesloguear(){
	socket.io.close();
	limpiarControles();
	ocultarControl(formChat);
	mostrarControl(formLogin);	
}

//Eventos Socket.io
socket.on("agregado ok", fnLogueado);
socket.on("mensaje enviado", fnMensajeEnviado);
socket.on("nuevo usuario", fnNuevoUsuario);
socket.on("usuario desconectado", fnUsuarioDesconectado);
socket.on("lista usuarios", fnListaUsuarios);

//Eventos botones
btnLoguear.addEventListener("click", fnLoguear);
btnEnviarMensaje.addEventListener("click", fnEnviarMensaje);
btnDesloguear.addEventListener("click", fnDesloguear);
btnDeseleccionar.addEventListener("click", fnDeseleccionar);

