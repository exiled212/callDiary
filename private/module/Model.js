(()=>{

	
	const 	mongoose	 	= 	require('mongoose');
	let		host 			= 	process.env.HOST_DATABASE		||	'calldiary-vc7xa.mongodb.net'
	,		name			=	process.env.NAME_DATABASE			||	'test'
	,		username		=	process.env.USERNAME_DATABASE		||	'diex'
	,		password		=	process.env.PASSWORD_DATABASE		||	'Ljkag5cdRjucsRj9'


	//Mongoose
	mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${name}`)
	// mongoose.connect(`mongodb://${host}`)
	db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	
	db.once('open', function() {
		console.log('conecto')
	});
	module.exports = mongoose;

})();