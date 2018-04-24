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
				
				xlsxUser(id){
					let deferred = $q.defer()
					$http.get(`scv/list/xlsx/user/${id}`)
						.then(result=>{
							let files = result.data.files
							deferred.resolve(files)
						})
					return deferred.promise
				},

				getDate(){
					return data
				},


				initJsTree(){
					$(function () {
						$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
						$('.tree li.parent_li > span').on('click', function (e) {
							var children = $(this).parent('li.parent_li').find(' > ul > li');
							if (children.is(":visible")) {
								children.hide('fast');
								$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
							} else {
								children.show('fast');
								$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
							}
							e.stopPropagation();
						});
					});
				}
			}
		}])




})();