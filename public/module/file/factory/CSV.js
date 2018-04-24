(()=>{

	angular.module('CallDaily')

		.factory('CSV', ['$http', '$q', function($http, $q){

			let dataCsv = {}

			return {
				get(){
					return dataCsv
				},

				set(data){
					dataCsv = {}
					for(let i in data){
						dataCsv[i] = data[i]
					}
				}
				
			}
		}])




})();