(()=>{

	require('rootpath')()

	const 	path		=	require('path')
	,		mongoose 	= 	require(path.join('private', 'module', 'Model.js'))
	,		Schema		=	mongoose.Schema


	schema = new Schema({
		nombres:		{type:String, index: {unique:false}},
		apellidos:		{type:String, index: {unique:false}},
	})

	schema.index({nombres: 1, apellidos: 1}, {unique:true})

	module.exports = mongoose.model('Perfil', schema)

})();