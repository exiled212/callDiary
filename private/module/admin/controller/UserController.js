(()=>{

	require('rootpath')()

	const	path	=	require('path')
	,		md5		=	require('md5')
	let 	User 	= 	require(path.join('private', 'module', 'admin', 'model', 'User.js'))

	module.exports = {

		login: 	(req, res)=>{
					let data 	= 	req.body
					data.password = md5(`${data.username}${data.password}`)
					let query 	= 	User.findOne(data)
					query.exec((err, user)=>{
						if(err) return res.status(200).send({status:'error', error:err});
						res.status(200).send({status:'success', user});
					})
				},

		create:	(req, res)=>{
					let deferred 	= 	Promise.defer()
					, 	data 		= 	req.body
					, 	Model		= 	new User(data)
					,	message		=	''

					Model.save(err=>{
						if(err) {
							if(err.code == 11000){
								message = 'Los datos suministrados ya se encuentran en uso'
							}
							return res.status(200).send({status:'error', message});
						} 
						return res.status(200).send({status:'success', message:'Registro exitoso'});
					})

				},
		update: (req, res)=>{
					let deferred 	= 	Promise.defer()
					, 	data 		= 	req.body
					,	message		=	''
					,	where		=	{username:data.username, password:md5(`${data.username}${data.password}`)}
					,	values		=	{email:data.email}
					,	options		=	{}
					
					User.findOne(where, (err, user)=>{
						if(err) {
							return res.status(200).send({status:'error', message:''});
						}

						User.update(where, values, options, (err, doc)=>{
							if(err)	return res.status(200).send({status:'error', message:'Error en el sistema'});
							return res.status(200).send({status:'success', message:'Actualización de registro exitosa'});
						})
						
					})
				},
		getLogin: (req, res)=>{
					let user = req.user
					if(!user) return res.status(200).send({isLogin:false,  message:'Inicie seción para poder continuar'})
					return res.status(200).send({isLogin:true, user, message:'Bienvenido'})
				}
	}

})();