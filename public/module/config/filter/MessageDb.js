(()=>{
	
		angular.module('CallDaily')
	
			.filter('messageDb', [ ()=>{
				return function(code, language){
					if(code){

					}
					return code
				}
			}])
	
	})();