(()=>{

	let xlsx =  require('node-xlsx');

	angular.module('CallDaily')

		.factory('XLSX', ['$http', '$q', function($http, $q){

			let rowsHead = [
					'plan', 
					'Nombre Completo', 
					'Tipo', 
					'Documento', 
					'Estrato', 
					'Dirección', 
					'Numero de Contacto',
					'CJ/Predial',
					'Megas',
					'Cupo'
				]
			,	xlsxHead = []

			return {
				getHead(){
					return rowsHead
				},


				uploadFile(file){
					// console.log(file)
					// let xlsxFile = xlsx.parse(file.pathFile)
					// console.log(xlsxFile)
					// let 	deferred = $q.defer()
					// , 		formData = new FormData()
					// formData.append('xlsx', file)
					
					// $http.post('/scv/xlsx/load', formData, {
					// 	headers: {
					// 		"Content-type": undefined
					// 	},
					// 	transformRequest: angular.identity
					// })
					// .then(result=>{
					// 	console.log(result)
					// })
				}
			}
		}])

})();