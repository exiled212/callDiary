(()=>{

	angular.module('CallDaily')

		.factory('DOCS', ['$http', '$q', function($http, $q){

			let data = [];

			return {
				listDate(){
					let deferred = $q.defer()
					$http.get('scv/listdoc')
						.then(result=>{
							let dateCsv = result.data.files.paths
							for(let i in dateCsv){
								data[i] = dateCsv[i]
							}
							deferred.resolve(true)
						})
					return deferred.promise
				},


				getDate(){
					return data
				}
			}
		}])




})();