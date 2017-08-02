(()=>{

	
	angular.module('CallDaily')

		.controller('Controller.Details',['$scope',  'CSV', function($scope,  CSV){
			$scope.functions = {}
			$scope.dataSelect = CSV.get()
		}])
})();