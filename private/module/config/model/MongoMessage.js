(()=>{
	
		require('rootpath')()
	
		const 	path		=	require('path')
		,		mongoose 	= 	require(path.join('private', 'module', 'Model.js'))
		,		Schema		=	mongoose.Schema
	
	
		schema = new Schema({
			code:		{type:Number, index: {unique:false}}
		})
	
		module.exports = mongoose.model('MongoMessage', schema)
	
	})();