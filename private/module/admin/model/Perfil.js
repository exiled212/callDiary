(()=>{

	require('rootpath')()

	const 	path		=	require('path')
	,		md5			=	require('md5')
	,		mongoose 	= 	require(path.join('private', 'module', 'Model.js'))
	,		Schema		=	mongoose.Schema


	schema = new Schema({
		nombres:		{type:String, index: {unique:false}},
		apellidos:		{type:String, index: {unique:false}},
	})

	module.exports = mongoose.model('Perfil', schema)

})();