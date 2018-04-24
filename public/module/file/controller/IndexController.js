(()=>{

	angular.module('CallDaily')

		.controller('Controller.Index',['$scope', 'CSV', 'XLSX', function($scope, CSV, XLSX){
			$scope.functions = {}
			$scope.css = {}

			$scope.xlsxData = XLSX.getData()
			$scope.dbHeads = XLSX.getDbHeads()
			$scope.xlsxResult = XLSX.getXlsxResult()
			$scope.xlsxResultHead = XLSX.getXlsxResultHeads()

			$scope.rowDbSelect = {}
			$scope.rowXlsxSelect = {}
			$scope.rowInsert = []

			XLSX.setDbHeads()
			$scope.functions.loadFile = ()=>{
				XLSX.uploadFile($scope.xlsxFile)
					.then(result=>{
						$scope.rowDbSelect = {}
						$scope.rowXlsxSelect = {}
						$scope.rowInsert = []
					})
			}

			$scope.functions.getKey = (labelName, value)=>{
				return XLSX.getKey(labelName, value)
			}

			$scope.functions.selectRowXlsx = (lib, data)=>{
				$scope.rowXlsxSelect.id = data.id
				$scope.rowXlsxSelect.lib = lib
				$scope.rowXlsxSelect.row = data.row
				$scope.rowXlsxSelect.data = data.column
				try { $scope.rowXlsxSelect.$apply() } catch (error) {}
			}

			$scope.functions.selectRowDb = (key, row)=>{
				$scope.rowDbSelect.id = key
				$scope.rowDbSelect.row = row
			}
			
			$scope.css.selectedDb = (key)=>{
				let result = 'btn-info'
				if(key == $scope.rowDbSelect.id) result = 'btn-warning';
				if($scope.rowInsert.filter(item=>item.dbId == key ).length > 0) result = 'hidden' ;
				return result
			}

			$scope.css.statusRow = (status)=>{
				let result = ''
				if(status == 'success'){
					result = 'success'
				} else if(status == 'error'){
					result = 'danger'
				}
				return result
			}
			$scope.css.selectedXlsx = (lib, key)=>{
				let result = 'btn-info'
				if(key == $scope.rowXlsxSelect.id && $scope.rowXlsxSelect.lib == lib) result = 'btn-warning';
				if($scope.rowInsert.filter(item=>( item.libId == lib && item.xlsxId == key) ).length > 0) result = 'hidden' ;
				return result
			}

			$scope.functions.addRow = ()=>{
				// $scope.rowInsert.push( { xlsxRow: $scope.rowXlsxSelect.row, dbRow: $scope.rowDbSelect.row, data: rowXlsxSelect.data} )
				$scope.rowInsert.push( { 
					libId: $scope.rowXlsxSelect.lib, 
					xlsxId: $scope.rowXlsxSelect.id , 
					xlsxRow: $scope.rowXlsxSelect.row, 
					dbRow: $scope.rowDbSelect.row ,
					dbId: $scope.rowDbSelect.id,
					data: $scope.rowXlsxSelect.data
				} )
				$scope.rowDbSelect = {}
				$scope.rowXlsxSelect = {}
			}

			$scope.functions.removeRow = (index)=>{
				$scope.rowInsert.splice(index, 1)
			}

			$scope.functions.sendData = ()=>{
				XLSX.save($scope.rowInsert)
					.then(result=>{
						$('#tableResult').click()
					})
			}



		}])
})();