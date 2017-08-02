(()=>{

	require('rootpath')()

	const	gulp			=	require('gulp')
	,		concat			=	require('gulp-concat')
	,		babel			=	require('gulp-babel')
	,		plumber			=	require('gulp-plumber')

	,		path			=	require('path')

	,		publicPath 		= 	`./public/libs/main/`
	// ,		templatePath 	= 	`${publicPath}template/`

	gulp.

		task('js', ()=>{
			gulp
				.src([
				])
		})

		.task('templateCSS', ()=>{
			gulp
				.src([
					path.join('public', 'libs', 'bootstrap', 				'css', 						'bootstrap.min.css'				),
					path.join('public', 'libs', 'metisMenu', 				'metisMenu.min.css'											),
					path.join('public', 'libs', 'morrisjs', 				'morris.css'												),
					path.join('public', 'libs', 'bootstrap-social',			'bootstrap-social.css'										),
					path.join('public', 'libs', 'datatables-plugins',		'dataTables.bootstrap.css'									),
					path.join('public', 'libs', 'datatables-responsive',	'dataTables.responsive.css'									),
				])
				.pipe(concat('template.css'))
				.pipe(gulp.dest(publicPath))
		})

		.task('angularLibs', ()=>{
			gulp
				.src([
					path.join('public', 		'libs', 				'angular', 	'angular.min.js'			),
					path.join('public', 		'libs', 				'angular', 	'angular-ui-router.js'		),
					path.join('public', 		'libs', 				'angular', 	'ocLazyLoad.min.js'			),
					path.join('node_modules', 	'angular-file-input', 	'dist', 	'angular-file-input.js'		),
				])
				.pipe(concat('angular-libs.js'))
				.pipe(gulp.dest(publicPath))
		})

		.task('templateJS', ()=>{
			gulp
				.src([
					path.join('public', 'libs', 'jquery', 					'jquery.min.js'												),
					path.join('public', 'libs', 'bootstrap', 				'js', 							'bootstrap.min.js'			),
					path.join('public', 'libs', 'metisMenu', 				'metisMenu.min.js'											),
					path.join('public', 'libs', 'raphael', 					'raphael.min.js'											),
					path.join('public', 'libs', 'morrisjs', 				'morris.min.js'												),
					path.join('public', 'libs', 'datatables',				'js', 			 				'jquery.dataTables.min.js'	),
					path.join('public', 'libs', 'datatables-plugins', 		'dataTables.bootstrap.min.js'								),
					path.join('public', 'libs', 'datatables-responsive', 	'dataTables.responsive.js'									)
				])
				.pipe(concat('template.js'))
				.pipe(gulp.dest(publicPath))
		})
	
		.task('default', ['templateCSS', 'templateJS', 'angularLibs']);

	



})();