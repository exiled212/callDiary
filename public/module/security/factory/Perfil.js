(()=>{

	angular.module('CallDaily')

		.factory('Perfil', ['$http', '$q', '$state', function($http, $q, $state){

			let 	perfil 	= 	{}
			,		list	=	[]
			,		select	=	''

			return {
				get(){
					return perfil
				},

				set(){
					
				},

				getAll(){
					return list
				},

				setAll(){
					$http.get('/admin/perfil/list')
						.then(result=>{
							let perfilList = result.data.list
							list.splice(0, list.length)
							for(let i in perfilList){
								list[i] = perfilList[i]
							}
						})
						.catch(err=>{
							list.splice(0, list.length)
						})
				},

				getPerfilUser(){
					return select
				},

				setPerfilUser(){
					
				},


				create(data){
					let deferred = $q.defer()

					$http.post('/admin/perfil/create', data)
						.then(result=>{
							console.log(result)
							deferred.resolve(result)
						})
						.catch(err=>{
							deferred.reject(true)
							console.log(err)
						})

					return deferred.promise
				}
			}
		}])




})();