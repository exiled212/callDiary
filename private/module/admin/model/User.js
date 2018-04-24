(()=>{

	require('rootpath')()

	const 	path		=	require('path')
	,		md5			=	require('md5')
	,		mongoose 	= 	require(path.join('private', 'module', 'Model.js'))
	,		Group 		= 	require(path.join('private', 'module', 'admin', 'model', 'Group.js'))
	,		Schema		=	mongoose.Schema

	schema = new Schema({
		nombres:		{	type:String, index: {	unique:false	}},
		apellidos:		{	type:String, index: {	unique:false	}},
		email: 			{	type:String, index: {	unique:true		}},
		group:			{	type: Schema.ObjectId, 	ref: "Group"	},
		password: 		String
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