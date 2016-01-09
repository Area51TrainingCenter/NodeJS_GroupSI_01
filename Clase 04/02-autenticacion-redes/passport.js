var pport = (function(passport){

	var modelo = require("./modelos/modeloUsuarios");
	var passportFacebook = require("passport-facebook").Strategy;

	passport.use(new passportFacebook({
	  clientID      : credenciales.facebook.claveCliente,
	  clientSecret  : credenciales.facebook.claveServidor,
	  callbackURL  : credenciales.facebook.urlCallback,
	  profileFields : ['id', 'displayName','photos']
	}, function(accessToken, refreshToken, profile, done) {

	  modelo.validar(profile.id, function(err, registros){
	    if(err) {return done(err);}

	    if(registros.length==0) {
	      var obj = {};
	      obj.id = profile.id;
	      obj.proveedor = profile.provider;
	      obj.name = profile.displayName;
	      obj.photo = profile.photos[0].value;

	      modelo.insertar(obj, function(err){
	        if(err) return done(null, false);
	        return done(null, obj);
	      })
	    } else {
	      return done(null, registros[0]);
	    }
	  }) 
	}));


})();

module.exports = pport;