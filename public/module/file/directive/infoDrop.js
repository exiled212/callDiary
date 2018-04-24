(()=>{
	angular.module('CallDaily')

		.directive('infoDrop', [ ()=>{

			let keyTarget = null

			return {
				restrict: 'A',
				scope: { model: '=' },
				link:(scope, Element, Attrs)=>{

					Element.on('dragstart', function(event){
						event.dataTransfer.effectAllowed = 'move';
						this.style.opacity = '0.4'
					})
					Element.on('dragend', function(event){
						this.style.opacity = '1'
					})
					Element.on('dragover', function(event){
						event.preventDefault();
						event.dataTransfer.dropEffect = 'move';
					})
					Element.on('dragenter', function(event){
					})
					Element.on('dragleave', function(event){
					})
					Element.on('drop', function(event){
						let a = event.dataTransfer.getData('a');
						console.log(a)
						event.stopPropagation()
					})
				}
			}
		}])
})();