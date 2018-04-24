(()=>{

	angular.module('CallDaily')

		.controller('Controller.Perfil',['$scope', '$state', 'User', 'Perfil', 'DOCS',  function($scope, $state, User, Perfil, DOCS){
			// User.isLogin()

			$scope.functions = {}
			$scope.search = {}
			$scope.perfil = {}
			$scope.perfilSelect = {}
			$scope.perfilEdit = {}
			$scope.perfilEditStatus = {}
			$scope.perfilList = Perfil.getAll()
			$scope.perfilXlsxList = []

			$scope.$watch('filePath', (old)=>{
				console.log(old)
			})


			Perfil.setAll()

			$scope.functions.create = ()=>{
				Perfil.create($scope.perfil)
					.then(result=>{
						$scope.perfilList.push({_id:result._id, nombres:result.nombres, apellidos:result.apellidos})
						$scope.perfil = {}
					})
			}

			$scope.functions.delete = (row, index)=>{
				Perfil.delete(row._id)
					.then(result=>{
						if($scope.perfilSelect.nombres){
							$('#btnAsignarExcel').click()
						}
						$scope.perfilSelect = {}
						$scope.perfilList.splice(index, 1)
					})
			}

			$scope.functions.update = (row, index)=>{
				Perfil.update(row)
					.then(result=>{
						if($scope.perfilSelect.nombres){
							$('#btnAsignarExcel').click()
						}
						$scope.perfilSelect = {}
						$scope.perfilList[index] = row
						$scope.perfilEditStatus[row._id] = false
						$scope.perfilEdit[row._id] = {}
					})
			}

			$scope.functions.select = (row)=>{
				if(!$scope.perfilSelect.nombres){
					$('#btnAsignarExcel').click()
				}
				DOCS.xlsxUser(row._id)
					.then(xlsx=>{
						$scope.perfilXlsxList = xlsx
						$scope.perfilSelect = row
						DOCS.initJsTree()
					})
				
			}

			$scope.functions.addXlsx = ()=>{
				$('#csvFile').click()
			}
			

		}])
})();