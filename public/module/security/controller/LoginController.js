(()=>{

	angular.module('CallDaily')
		.controller('Controller.Login',['$scope', 'User', '$state', function($scope, User, $state){
			$scope.functions = {};
			$scope.user = {};
			$scope.alerts = [];

			User.isLogin()

			$scope.functions.submit = ()=>{
				User.login($scope.user)
					.then(result=>{
						if(result){
							$scope.alerts.push({status:'success', message:'Inicio Correcto'})
							$state.go('main.perfils')
						} else {
							$scope.alerts.push({status:'error', message:'Datos Invalidos'})
						}
					})
					.catch(error=>{
						$scope.alerts.push({status:'error', message:'El sistema no Responde, intentelo más tarde'})
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