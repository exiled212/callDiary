(()=>{

	require('rootpath')()
	
	const 	path 			= 	require("path")
	,		md5 			= 	require("md5")
	,		passport 		= 	require("passport")
	, 		localStrategy 	= 	require("passport-local")

	let		User		=	require(path.join( 'private', 'module', 'admin', 'model', 'User.js'))

	passport.use(new localStrategy((username, password, done)=>{
		password = md5(`${username}${password}`)
		User.findOne({username, password}, 'username', (err, user)=>{
			if(err) return  done(null, false)
			if(!user) return  done(null, false)
			return done(null, user)
		})
	}))

	module.exports = passport
})();