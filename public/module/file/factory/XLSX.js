(()=>{


	angular.module('CallDaily')

		.factory('XLSX', ['$http', '$q', function($http, $q){

			let rowsHead = []
			,	xlsxData = []
			,	xlsxResult = []
			,	xlsxResultHead = []

			return {

				getDbHeads(){
					return rowsHead
				},
				setDbHeads(){
					rowsHead.splice(0, xlsxData.length)
					$http.get('/file/db/heads')
					.then(result=>{
						let data = result.data
						if(data.status=='success'){
								for(let i in data.rowsHead){
									rowsHead[i] = data.rowsHead[i]
								}
							}
						})
				},


				getData(){
					return xlsxData
				},


				uploadFile(file){
					let formData = new FormData()
					,	deferred = $q.defer()
					if(!file){
						xlsxData.splice(0, xlsxData.length)
						deferred.resolve(true)
					} else {
						formData.append('file', file)
						$http.post('/file/xlsx/load', formData, {
							headers: {
								"Content-Type": undefined
							},
							transformRequest: angular.identity
						})
							.then(result=>{
								let data = result.data
								if(data.status == 'success'){
									for(let i in data.file){
										xlsxData[i] = data.file[i]
									}
									deferred.resolve(true)
								}
							})
					}
					return deferred.promise
				},

				getKey(labelName, value){
					return xlsxData.map( (item)=>{ return item[labelName] } ).indexOf(value)
				},

				getKeySingle(value, object){
					if(object){
						return object.indexOf(value)
					}
				},


				save(data){
					let deferred = $q.defer()
					$http.post('/file/save', data)
						.then(result=>{
							xlsxResult.splice(0, xlsxResult.length)
							xlsxResultHead.splice(0, xlsxResultHead.length)
							if(result.data.status == 'success'){
								result.data.result.map( (value, i)=>{
									xlsxResult[i] = value
								} )
								console.log(xlsxResult)
								if(xlsxResult.length > 0){
									let dataIni = xlsxResult[0].model
									for(let i in dataIni){
										if(i.startsWith('_')) continue;
										xlsxResultHead.push(i)
									}
								}
							}
							deferred.resolve(true)
						})

					return deferred.promise
				},

				getXlsxResult(){
					return xlsxResult
				},

				getXlsxResultHeads(){
					return xlsxResultHead
				}
			}
		}])

})();