(()=>{

	require('rootpath')()

	//Modulos
	const 	express 	= 	require('express')
	,		path		=	require('path')
	//Controles
	,		UserController 		= 	require(path.join( 'private', 'module', 'admin', 'controller', 'UserController.js'))
	,		PerfilController 	= 	require(path.join( 'private', 'module', 'admin', 'controller', 'PerfilController.js'))

	//rutas
	let		router 		= 	express.Router()
	,		Passport	=	require(path.join('private', 'module', 'Passport.js'))

	//User

	router.get('/isLogin', UserController.getLogin)

	router.post('/login', Passport.authenticate('local'), UserController.login)
	router.post('/create', UserController.create)
	router.post('/update', UserController.update)


	//Perfil
	router.get('/perfil/list', PerfilController.list)

	router.post('/perfil/create', PerfilController.create)
	router.post('/perfil/update', PerfilController.update)
	router.post('/perfil/delete', PerfilController.delete)

	module.exports = router;


})();