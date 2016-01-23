/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listarMascotasXUsuario: function(req, res) {
    Usuario.find({sexo: "masculino"});
    Usuario.create({nombre:"Sergio"});
    Usuario.update({id:234},{nombre: "Iván"});
    Usuario.destroy(
      {
        compras:
          {
            and: {
              "<": 10000,
              ">": 5000
            }
          },
        sexo: "masculino"
      }
    );

    Usuario.destroy(
      {
        or: {
          compras: {
            and: {
              ">": 5000,
              "<": 10000
            }
          },
          sexo: "masculino"
        }
      }
    );


  }
};

