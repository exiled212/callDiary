(()=>{

	require('rootpath')()

	const	path	=	require('path')
	,		md5		=	require('md5')
	let 	Perfil 	= 	require(path.join('private', 'module', 'admin', 'model', 'Perfil.js'))
	let 	User 	= 	require(path.join('private', 'module', 'admin', 'model', 'User.js'))

	module.exports = {

		create:	(req, res)=>{
					let data 		= 	req.body
					,	user		=	req.user
					if(!user) return res.status(200).send({status:'error', message:'Session no encontrada, cierre session y vuelva a engresar al sistema'});
					User.findOne({username:user.username}, (err, result)=>{
						if(err) return res.status(200).send({status:'error', message:'Session no encontrada, cierre session y vuelva a engresar al sistema'});
						data.user = result
						newPerfil = new Perfil(data)
						newPerfil.save(err=>{
							if(err) return res.status(200).send({status:'error', message:err.errmsg});
							return res.status(200).send({status:'success', message:'Perfil Creado'});
						})

					})
				},

		list: (req, res)=>{
					let	list		=	[]
					Perfil.find({user}, (err, list)=>{
						if(err) list = []
						return res.status(200).send({status:'success', list});
					})
				}
		
	}

})();