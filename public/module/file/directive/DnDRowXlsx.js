(()=>{
	angular.module('CallDaily')

		.directive('dndRowXlsx', [ ()=>{

			return {
				restrict: 'E',
				scope: { 
					name: '@'
				},
				template: 	`<div draggable="true" class="btn btn-info"> <span ng-bind="name"></span> </div>`,
				link:(scope, Element, Attrs)=>{
					Element.on('dragstart', function(e){
						e.dataTransfer.effectAllowed = 'move';
					})
				}
			}
		}])
})();