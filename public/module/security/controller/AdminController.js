(()=>{

	angular.module('CallDaily')

		.controller('Controller.Admin',['$scope', '$state', 'User', function($scope, $state, User){
			User.isLogin()
		}])
})();