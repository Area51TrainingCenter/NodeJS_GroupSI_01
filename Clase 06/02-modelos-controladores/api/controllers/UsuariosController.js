/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	listar: function(req, res) {
    Usuarios
      .find()
      .then(function(registros){
        res.view("listadoUsuarios", {reg: registros});
      })
      .catch(function(err){
        res.serverError(err);
      });
  },

  autenticar: function(req, res){
    var usuario = req.body.usuario;
    var contrasena = req.body.contrasena;

    var filtro = {nombreUsuario: usuario, contrasena: contrasena};

    Usuarios
      .find()
      .where(filtro)
      .then(function(registros){
        if(registros.length) {
          req.session.authenticated=true;
          res.redirect("/listarUsuarios");
        } else {
          res.redirect("/");
        }
      })
      .catch(function(err){
        res.negotiate(err);
      });

  },

  logout: function(req, res){
    req.session.authenticated = false;
    res.redirect("/");
  },

  formInsertar: function(req, res){
    res.view("agregarUsuario");
  },

  formEditar: function(req, res){
    var id = req.params.id;

    Usuarios
      .find({id: id})
      .then(function(registros){
          if(registros.length) {
            res.view("editarUsuario", registros[0]);
          } else {
            res.send("No hay usuario registrado");
          }
      })
      .catch(function(err){
        res.negotiate(err);
      });
  },

  insertar: function(req, res){
    var nombreUsuario = req.body.usuario;
    var contrasena = req.body.contrasena;

    var nombreMascota = req.body.nombreMascota;

    var datos = {
      nombreUsuario: nombreUsuario,
      contrasena: contrasena
    };

    Usuarios
      .create(datos)
      .then(function(registro){
        var usuario=registro.id;
        var datosMascota = {usuario: usuario, nombreMascota: nombreMascota};

        return Mascotas.create(datosMascota);
      })
      .then(function(registroMascota){
        res.redirect("/listarUsuarios");
      })
      .catch(function(err){
        res.negotiate(err);
      });
  },

  editar: function(req, res){
    var id = req.params.id;
    var nombreUsuario = req.body.usuario;
    var contrasena = req.body.contrasena;

    Usuarios
      .update({id: id}, {nombreUsuario: nombreUsuario, contrasena: contrasena})
      .then(function(registros){
        res.redirect("/listarUsuarios");
      })
      .catch(function(err){
        res.negotiate(err);
      });

  },

  eliminar: function(req, res){
    var id = req.params.id;

    Usuarios
      .destroy()
      .where({id: id})
      .then(function(registros){
        res.redirect("/listarUsuarios");
      })
      .catch(function(err){
        res.negotiate(err);
      });

  }


};

