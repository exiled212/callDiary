(()=>{

	require('rootpath')()

	const	path	=	require('path')
	,		md5		=	require('md5')
	,		fs		=	require('fs')
	let 	Perfil 	= 	require(path.join('private', 'module', 'admin', 'model', 'Perfil.js'))
	,	 	User 	= 	require(path.join('private', 'module', 'admin', 'model', 'User.js'))

	//Functons
	,		newDir = (pathFile)=>{
				try {
					fs.mkdir(pathFile)
				} catch (error) {
					console.log(error.message)
				}
			}
	,		isFile = (pathFile)=>{
				try {
					return fs.statSync(pathFile).isFile()
				} catch (error) {
					return false;
				}
			}
	,		listDir = (pathFile)=>{
				try {
					return fs.readdirSync(pathFile)
				} catch (error) {
					return [];
				}
			}
	,		dropFile = (pathFile)=>{
				try {
					fs.unlinkSync(pathFile)
				} catch (error) {
					console.log(error.message)
				}
			}
	,		dropDir = (pathFile)=>{
				try {
					fs.rmdirSync(pathFile)
				} catch (error) {
					console.log(error.message)
				}
			}

	,		dropAll = (pathFile)=>{
				let newPathFile

				if(isFile(pathFile)){
					dropFile(pathFile)
				} else {
					let dirs = listDir(pathFile)
					for(let i in dirs){
						let dir = dirs[i]
						newPathFile = path.join(pathFile, dir)
						dropAll(newPathFile)
					}
					dropDir(pathFile)
				}
			}

	module.exports = {

		create:	(req, res)=>{
					let data 		= 	req.body
					,	newPerfil 	= 	new Perfil(data)
					,	id 			=	newPerfil._id
					,	pathFile	=	path.join('public', 'upload', 'xlsx', id+'')
					newPerfil.save(err=>{
						if(err) return res.status(200).send({status:'error', message:err.errmsg});
						newDir(pathFile)
						return res.status(200).send({status:'success', message:'Perfil Creado', perfil:newPerfil});
					})
				},

		delete:	(req, res)=>{
					let 	id 		= 	req.body.id
					,	pathFile	=	path.join('public', 'upload', 'xlsx', id+'')
					Perfil.remove( { _id: id} ,err=>{
						if(err) return res.status(200).send({status:'error', message:err.errmsg});
						dropAll(pathFile)
						return res.status(200).send({status:'success', message:'Perfil Creado'});
					})
				},

		update:	(req, res)=>{
					let data 		= 	req.body
					,	where		=	{_id:data._id}
					,	values		=	{nombres:data.nombres, apellidos:data.apellidos}
					,	options		=	{}

					Perfil.update(where, values, options ,(err, perfil)=>{
						if(err) return res.status(200).send({status:'error', message:err.errmsg});
						return res.status(200).send({status:'success', message:'Perfil Creado', perfil});
					})
				},

		list: (req, res)=>{
					let	list		=	[]
					Perfil.find({}, (err, list)=>{
						if(err) list = []
						return res.status(200).send({status:'success', list});
					})
				}
		
	}

})();