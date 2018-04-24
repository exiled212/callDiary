(()=>{
	angular.module('CallDaily')

		.directive('uploadFile', ['$parse', ($parse)=>{
			return {
				restrict: 'A',
				link:(scope, Element, Attrs)=>{
					Element.on('change', (event)=>{
						$parse(Attrs.uploadFile).assign(scope, Element[0].files[0])
					})
				}
			}
		}])
})();