(()=>{

	angular.module('CallDaily', ['ui.router', 'oc.lazyLoad', 'angular-file-input'])

		.config(($stateProvider, $urlRouterProvider)=>{

			 $urlRouterProvider
				.otherwise('/csv');
			let states = [

				//Login

				//Main
				{	name:'main',	templateUrl: './views/layouts/main.html', 	abstract: true},

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

				{	name:'main.csv', url:'/csv', templateUrl: './views/csv/index.html', controller: 'Controller.Index',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/csv/controller/IndexController.js',
								'./module/csv/factory/CSV.js',
							])
						}
					} 
				},


				{	name:'main.csv.details', url:'/{index}', templateUrl: './views/csv/_details.html', controller: 'Controller.Details',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/csv/controller/DetailsController.js',
							])
						}
					} 
				},
				{	name:'main.doc', url:'/documentos', templateUrl: './views/csv/doc.html', controller: 'Controller.Doc',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/csv/controller/DocController.js',
								'./module/csv/factory/DOCS.js',
							])
						}
					} 
				},
				{	name:'main.upload', url:'/upload', templateUrl: './views/csv/upload.html', controller: 'Controller.Upload',
					resolve: {
						loadPlugin: function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'./module/csv/controller/UploadController.js',
								'./module/csv/factory/DOCS.js',
							])
						}
					} 
				},
				{	name:'main.sms', url:'/sms', templateUrl: './views/csv/sms.html', 
					
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