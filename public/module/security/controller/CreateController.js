(()=>{

	angular.module('CallDaily')

		.controller('Controller.Create',['$scope', 'User', function($scope, User){
			$scope.functions = {}
			$scope.user = {}
			$scope.alerts = []

			$scope.functions.submit = ()=>{
				User.create($scope.user)
					.then(result=>{
						$scope.alerts.push(result)
					})
			}

			$scope.functions.statusAlert = (status)=>{
				let result = '';
				if(status == 'error'){ result = 'alert-danger' }
				else if(status == 'success'){ result = 'alert-success' }
				return result;
			}

			$scope.functions.removeAlert = (index)=>{
				$scope.alerts.splice(index, 1);
			}
		}])
})();