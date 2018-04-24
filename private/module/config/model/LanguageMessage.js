(()=>{
	
		require('rootpath')()
	
		const 	path			=	require('path')
		,		mongoose 		= 	require(path.join('private', 'module', 'Model.js'))
		,		MongoMessage 	= 	require(path.join('private', 'module', 'config', 'model', 'MongoMessage.js'))
		,		Schema			=	mongoose.Schema
	
	
		schema = new Schema({
			language:			{type:String, index: {unique:false}},
			message:			{type:String, index: {unique:false}},
			mongo_message:		{type: Schema.ObjectId, ref: "MongoMessage" }
		})
	
		module.exports = mongoose.model('LanguageMessage', schema)
	
	})();