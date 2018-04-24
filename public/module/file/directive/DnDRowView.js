(()=>{
	angular.module('CallDaily')

		.directive('dndRowView', [ ()=>{

			return {
				restrict: 'E',
				scope: { 
					name: '@'
				},
				template: 	`<div class="btn btn-info"> <span ng-bind="headRow"></span> </div>`,
				link:(scope, Element, Attrs)=>{
					
				}
			}
		}])
})();