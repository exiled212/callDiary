(()=>{

	
	
	angular.module('CallDaily')

		.controller('Controller.Doc',['$scope',  'DOCS', function($scope,  DOCS){
			$scope.functions = {}
			$scope.files = {}

			$scope.files.data = DOCS.getDate()

			DOCS.listDate()
				.then(result=>{
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
				})

		}])
})();