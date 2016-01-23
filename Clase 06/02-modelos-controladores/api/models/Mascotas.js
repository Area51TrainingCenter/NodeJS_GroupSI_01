/**
* Mascotas.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: "connMySQL",
  tableName: "mascotas",
  attributes: {
    id: {
      type:"integer",
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },

    nombreMascota: {
      type: "string",
      size: 255
    },

    usuario: {
      model: "usuarios"
    }
  }

};

