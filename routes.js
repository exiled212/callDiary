(()=>{

	require('rootpath')()


	const 	path	=	require('path')
	,		File 	= 	require(path.join('private', 'module', 'file', 'routes.js'))
	,		Admin 	= 	require(path.join('private', 'module', 'admin', 'routes.js'))

	module.exports = (app)=>{
		app
			.get('/', (req, res)=>{
				res.render('./index.html');
			})

			.use('/file', File)
			.use('/admin', Admin)
		

	};


})();