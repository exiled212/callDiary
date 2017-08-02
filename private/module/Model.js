(()=>{

	
	const 		mongoose 	= 	require('mongoose')

	let		host 		= 	process.env.HOST_DATABASE		||	'localhost'
	,		name		=	process.env.NAME_DATABASE		||	'calldiary'


	//Mongoose
	mongoose.connect(`mongodb://${host}/${name}`)
	// mongoose.connect(`mongodb://${host}`)
	db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	db.once('open', function() {
		console.log('conecto')
	});
	module.exports = mongoose;

})();