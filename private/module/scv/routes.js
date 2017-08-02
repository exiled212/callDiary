(()=>{

	require('rootpath')()

	//Modulos
	const 	express 	= 	require('express')
	,		path		=	require('path')
	//Controles
	// ,		PerfilController 	= 	require(path.join( 'private', 'module', 'admin', 'controller', 'PerfilController.js'))
	,		DocsController 	= 	require(path.join( 'private', 'module', 'scv', 'controller', 'DocsController.js'))

	//rutas
	let		router 		= 	express.Router()
	// ,		Passport	=	require(path.join('private', 'module', 'Passport.js'))

	//Docs
	router.get('/listdoc', DocsController.docs)
	// router.post('/login', Passport.authenticate('local'), UserController.login)




	module.exports = router;


})();