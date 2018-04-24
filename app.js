(()=>{

	require('rootpath')()

	const 	express 		= 	require('express')
	,		bodyParser		=	require('body-parser')
	,		methodOverride	=	require('method-override')
	,		session 		= 	require("express-session")
	, 		cookieParser 	= 	require("cookie-parser")
	, 		cons 			= 	require("consolidate")
	, 		favicon 		= 	require("serve-favicon")
	, 		path 			= 	require("path")
	, 		passport 		= 	require("passport")
	, 		fastCsv 		= 	require("fast-csv")


	let 	app	= express()

	//Configuracion de Sessiones
	app			
		.use(cookieParser())
		.use(session({
			secret:				'test'	,
			resave:				false	,
			maxAge:				1200000	,
			saveUninitialized:	false
		}))
	//Configuracion de Express
		.use(express.static('./public'))
		.use(favicon(path.join('public', 'img', 'favicon.ico')))
		.use(bodyParser.urlencoded({ extended: true }))
		.use(bodyParser.json())
		.use(methodOverride())
		.use(passport.initialize())
		.use(passport.session())

		.engine('html', cons.swig)

		.set('views', `./public/views`)
		.set('view engine', 'ejs')

	passport.serializeUser((user, done)=>{
		done(null, user)
	})
	passport.deserializeUser((user,done)=>{
		done(null, user)
	})

	require('./routes.js')(app);
		
		
	module.exports = app
})();