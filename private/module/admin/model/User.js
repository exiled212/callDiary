(()=>{

	require('rootpath')()

	const 	path		=	require('path')
	,		md5			=	require('md5')
	,		mongoose 	= 	require(path.join('private', 'module', 'Model.js'))
	,		Schema		=	mongoose.Schema

	schema = new Schema({
		username: 	{type:String, index: {unique:true}},
		password: 	String
	})

	schema.pre('save', function(next){
		this.password = md5(`${this.username}${this.password}`)
		next();
	})

	schema.pre('update', function(next){
		this.password = md5(`${this.username}${this.password}`)
		next();
	})

	module.exports = mongoose.model('User', schema)

})();