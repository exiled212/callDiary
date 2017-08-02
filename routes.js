(()=>{

	require('rootpath')()


	const 	path	=	require('path')
	,		Scv 	= 	require(path.join('private', 'module', 'scv', 'routes.js'))
	,		Admin 	= 	require(path.join('private', 'module', 'admin', 'routes.js'))

	module.exports = (app)=>{
		app
			.get('/', (req, res)=>{
				res.render('./index.html');
			})

			.use('/scv', Scv)
			.use('/admin', Admin)
		

	};


})();