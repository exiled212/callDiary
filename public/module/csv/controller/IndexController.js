(()=>{

	angular.module('CallDaily')

		.controller('Controller.Index',['$scope', '$state', 'CSV', function($scope, $state, CSV){
			$scope.functions = {}
			$scope.tableHeader = []
			$scope.tableBody = []
			$scope.indexSelected = null

			$scope.functions.loadCsv = ()=>{
				$scope.tableHeader.splice(0, $scope.tableHeader.length)
				$scope.tableBody.splice(0, $scope.tableBody.length)
				let 	reader = new FileReader()
				,		file = $scope.filePath
				if(!file){
					$scope.indexSelected = null
					CSV.set({})
					return
				}
				console.log(XLSX.readFile(file))
				if(file.type.match('application/vnd.ms-excel')){


					reader.onload = function(e){
						let result = e.target.result
						,	rowsText = result.split(/\r\n|\n/)
						,	row = rowsText[0].split(';');

						$scope.tableHeader = row
						
						for(let i in rowsText){
							let rowText = rowsText[i]
							,	dataKey = {}
							rowsText[i] = rowText.split(';');
							for(let o in row){
								dataKey[row[o]] = rowsText[i][o]
							}
							dataKey.length = rowsText[i].length
							rowsText[i] = dataKey
						}
						rowsText.filter( itemF=> itemF['Documento'] != '' && rowsText[0] != itemF && itemF.length == rowsText[0].length).map(itemM=>$scope.tableBody.push(itemM))
						$scope.$apply()
					}
					reader.readAsText(file)
				}
			}


			$scope.functions.select = (row, index)=>{
				let documento = row.Documento
				$scope.indexSelected = index
				CSV.set(row)
				$state.go('main.csv.details', {index:index+1})
			}

			$scope.functions.selected = (index)=>{
				let result = ''
				if($scope.indexSelected == index) result = 'info';
				return result
			}

			// setTimeout(()=>{ $('.table-js').DataTable({ responsive: true }); }, 1) 
		}])
})();