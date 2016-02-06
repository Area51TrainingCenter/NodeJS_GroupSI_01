module.exports = {
	listar: function(req, res){
		Usuarios
			.find()
			.then(function(registros){
				res.json(registros);
			})
			.catch(function(err){
				res.negotiate(err);
			});
	}
}