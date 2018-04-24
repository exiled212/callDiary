(()=>{

	angular.module('CallDaily', ['ui.router', 'oc.lazyLoad']) //, 'angular-file-input'

		.config(($stateProvider, $urlRouterProvider)=>{

			 $urlRouterProvider
				.otherwise('/xlsx');
			let states = [

				//Login

				//Main
				{	name:'main',	templateUrl: './views/layouts/main.html', 	abstract: true,
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/config/filter/MessageDb.js',
							])
						}
					}
				},

				{	name:'main.login', url:'/login', templateUrl: './views/login.html', controller:'Controller.Login',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/security/factory/User.js',
								'./module/security/controller/LoginController.js',
							])
						}
					}
				},


				{	name:'main.create', url:'/create', templateUrl: './views/security/create.html', controller:'Controller.Create' ,
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/security/factory/User.js',
								'./module/security/controller/CreateController.js',
							])
						}
					}
				},

				{	name:'main.perfil', url:'/perfil', templateUrl: './views/security/perfil.html', controller:'Controller.Perfil' ,
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/file/factory/DOCS.js',
								'./module/security/factory/User.js',
								'./module/security/factory/Perfil.js',
								'./module/security/controller/PerfilController.js',
							])
						}
					}
				},

				{	name:'main.csv', url:'/xlsx', templateUrl: './views/file/index.html', controller: 'Controller.Index',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/file/filter/DbData.js',
								'./module/file/directive/uploadFile.js',
								'./module/file/factory/XLSX.js',
								'./module/file/factory/CSV.js',
								'./module/file/controller/IndexController.js',
							])
						}
					} 
				},


				{	name:'main.csv.details', url:'/{index}', templateUrl: './views/file/_details.html', controller: 'Controller.Details',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/file/controller/DetailsController.js',
							])
						}
					} 
				},
				{	name:'main.doc', url:'/documentos', templateUrl: './views/file/doc.html', controller: 'Controller.Doc',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/file/controller/DocController.js',
								'./module/file/factory/DOCS.js',
							])
						}
					} 
				},
				{	name:'main.upload', url:'/upload', templateUrl: './views/file/upload.html', controller: 'Controller.Upload',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/file/controller/UploadController.js',
								'./module/file/factory/DOCS.js',
							])
						}
					} 
				},
				{	name:'main.sms', url:'/sms', templateUrl: './views/file/sms.html', 
					
				},
			];
			
			states.forEach(function(state) {
				$stateProvider.state(state);
			})

		})

		.run(function($http, ng1UIRouter) {
			window['ui-router-visualizer'].visualizer(ng1UIRouter);
		})

})();