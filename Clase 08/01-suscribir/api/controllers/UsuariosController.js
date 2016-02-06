/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `UsuariosController.listar()`
   */
  listar: function (req, res) {
    res.view("lista", {nombre:"Sergio Hidalgo", layout: "base"});
  }
};

