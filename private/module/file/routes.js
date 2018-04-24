(()=>{

	require('rootpath')()

	//Modulos
	const 	express 	= 	require('express')
	,		path		=	require('path')
	, 		multipart	= 	require("connect-multiparty")
	//Controles
	// ,		PerfilController 	= 	require(path.join( 'private', 'module', 'admin', 'controller', 'PerfilController.js'))
	,		DocsController 	= 	require(path.join( 'private', 'module', 'file', 'controller', 'DocsController.js'))
	,		XlsxController 	= 	require(path.join( 'private', 'module', 'file', 'controller', 'XlsxController.js'))

	//rutas
	let		router 					= 	express.Router()
	,		multipartMiddleware 	=	multipart()

	// ,		Passport	=	require(path.join('private', 'module', 'Passport.js'))

	//Docs
	router.get('/listdoc', DocsController.docs)
	router.get('/list/xlsx/user/:id', DocsController.xlsxUser)

	//Xlsx
	router.post('/xlsx/load', multipartMiddleware, XlsxController.load)
	router.get('/db/heads', XlsxController.getRowDb)
	router.post('/save', XlsxController.insertXlsx)




	module.exports = router;


})();