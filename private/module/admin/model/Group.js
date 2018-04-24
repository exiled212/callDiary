(()=>{
	
		require('rootpath')()
	
		const 	path		=	require('path')
		,		mongoose 	= 	require(path.join('private', 'module', 'Model.js'))
		,		Schema		=	mongoose.Schema
	
	
		schema = new Schema({
			nombre:		{type:String, index: {unique:false}},
		})
	
		module.exports = mongoose.model('Group', schema)
	
	})();