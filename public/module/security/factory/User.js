(()=>{

	angular.module('CallDaily')

		.service('User', ['$http', '$q', '$state', function($http, $q, $state){

		
			let 	user 	= 	{}
			,		login	=	{}

			return {
				get(){
					return user;
				},
				set(){
					let deferred = $q.defer()
					$http.get('/admin/isLogin')
						.then(result=>{
							let data = result.data
							for(let i in data.user){
								user[i] = data.user[i]
							}
						})
				},


				isLogin(){
					if(!login.username){
						$http.get('/admin/isLogin')
							.then(result=>{
								let data = result.data
								isLogin = data.isLogin
								if(!isLogin){
									$state.go('login')
								} else{
									login = data.user
									$state.go('admin.details')
								}
							})
					} else {
						$state.go('admin.details')
					}
				},

				login(data){
					let deferred = $q.defer()
					$http.post(`/admin/login`, data)
						.then(result=>{
							let user = result.data.user;
							if(!user){
								deferred.resolve(false)
							} else {
								login = user;
								deferred.resolve(true)
							}
						})
						.catch(err=>{
							deferred.reject(err)
						})
					return deferred.promise
				},


				create(data){
					let deferred = $q.defer();
					let result = {};
					if(data.password != data.passwordValidate) {
						result.status = 'error'
						result.message = 'La contraseña no coincide'
						deferred.resolve(result)
					}
					delete data.passwordValidate;
					$http.post('/admin/create', data)
						.then(result=>{
							data = result.data;
							deferred.resolve(data)
						})
					return deferred.promise
				},


				update(data){
					let deferred = $q.defer();
					let result = {};
					if( data.password != data.passwordValidate) {
						result.status = 'error'
						result.message = 'La contraseña no coincide'
						deferred.resolve(result)
					} 
					delete data.passwordValidate;
					$http.post('/admin/update', data)
						.then(result=>{
							data = result.data;
							deferred.resolve(data)
						})
					return deferred.promise
				}
				
			}
		}])




})();