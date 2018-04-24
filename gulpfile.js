(()=>{

	require('rootpath')()

	const	gulp			=	require('gulp')
	,		uglify			=	require('gulp-uglify')
	,		concat			=	require('gulp-concat')
	,		babel			=	require('gulp-babel')
	,		plumber			=	require('gulp-plumber')
	,		source			=	require('vinyl-source-stream')
	,		buffer			=	require('vinyl-buffer')
	,		browserify		=	require('browserify')

	,		path			=	require('path')

	,	 	pathLibs 		=	path.join('public', 'libs')
	,		publicPath 		=	path.join(pathLibs, 'main')

	,	 	pathModule 		=	path.join('public', 'module')
	,	 	pathScript 		=	path.join('public', 'script')
	// ,		templatePath 	= 	`${publicPath}template/`



	gulp.

		//Factory XLSX.js
		task('f-f-xlsx', ()=>{
			browserify( path.join(pathScript, 'file', 'factory', 'XLSX.js') )
				.bundle()
				.pipe(source('XLSX.js'))
				.pipe(buffer())
				// .pipe(uglify())
				.pipe(gulp.dest( path.join(pathModule, 'file', 'factory') ))
		})

		.task('templateCSS', ()=>{
			gulp
				.src([
					path.join( pathLibs, 'bootstrap', 				'css', 						'bootstrap.min.css'				),
					path.join( pathLibs, 'metisMenu', 				'metisMenu.min.css'											),
					path.join( pathLibs, 'morrisjs', 				'morris.css'												),
					path.join( pathLibs, 'bootstrap-social',		'bootstrap-social.css'										),
					path.join( pathLibs, 'datatables-plugins',		'dataTables.bootstrap.css'									),
					path.join( pathLibs, 'datatables-responsive',	'dataTables.responsive.css'									),
				])
				.pipe(concat('template.css'))
				.pipe(gulp.dest(publicPath))
		})

		.task('angularLibs', ()=>{
			gulp
				.src([
					path.join( pathLibs, 	'angular', 	'angular.min.js'			),
					path.join( pathLibs, 	'angular', 	'angular-ui-router.js'		),
					path.join( pathLibs, 	'angular', 	'ocLazyLoad.min.js'			),
					path.join( pathLibs, 	'modernizr', 	'modernizr-custom.js'	),

					path.join('node_modules', 	'angular-file-input', 	'dist', 	'angular-file-input.js'		),
				])
				.pipe(concat('angular-libs.js'))
				.pipe(gulp.dest(publicPath))
		})

		.task('templateJS', ()=>{
			gulp
				.src([
					path.join( pathLibs, 'jquery', 					'jquery.min.js'												),
					path.join( pathLibs, 'bootstrap', 				'js', 							'bootstrap.min.js'			),
					path.join( pathLibs, 'metisMenu', 				'metisMenu.min.js'											),
					path.join( pathLibs, 'raphael', 				'raphael.min.js'											),
					path.join( pathLibs, 'morrisjs', 				'morris.min.js'												),
					path.join( pathLibs, 'datatables',				'js', 			 				'jquery.dataTables.min.js'	),
					path.join( pathLibs, 'datatables-plugins', 		'dataTables.bootstrap.min.js'								),
					path.join( pathLibs, 'datatables-responsive', 	'dataTables.responsive.js'									)
				])
				.pipe(concat('template.js'))
				.pipe(gulp.dest(publicPath))
		})
	
		.task('default', ['templateCSS', 'templateJS', 'angularLibs'])

		.task('browserify', ['f-f-xlsx'])

	



})();