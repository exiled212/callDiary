(()=>{
	angular.module('CallDaily')

		.directive('rowDrop', [ ()=>{

			let 	keyTarget 	= 	null
			,		name		= 	''
			,		data		= 	[]
			,		lkey 		=	null
			,		placeStart 		=	null
			,		table 		=	[]

			return {
				restrict: 'A',
				scope: { modelName: '=', model: '=', modelData:"=", dname: '@', dkey: '@', lkey:'@', place:'@' },
				link:(scope, Element, Attrs)=>{

					let 	keyDrop = scope.dkey

					Element.on('dragstart', function(event){
						placeStart = scope.place
						keyTarget = scope.dkey
						lkey	=	scope.lkey
						data = scope.modelData
						console.log(data)
						event.dataTransfer.effectAllowed = 'move';
						this.style.opacity = '0.4'
					})
					Element.on('dragend', function(event){
						this.style.opacity = '1'
						this.style.border = ''
					})
					Element.on('dragover', function(event){
						event.preventDefault();
						event.dataTransfer.dropEffect = 'move';
					})
					Element.on('dragenter', function(event){
						this.style.border = '2px dashed #000'
					})
					Element.on('dragleave', function(event){
						this.style.border = ''
					})
					Element.on('drop', function(event){
						event.stopPropagation()
						if(scope.place != placeStart){
							table = scope.model[lkey].data.map(item=>item.filter( (rowValue, rowKey)=> rowKey == keyTarget))
							scope.model[lkey].data.map(item=>item.splice(keyTarget, 1))
							scope.modelData.push = table
							scope.$apply()
						}
						
						
						// scope.modelName.splice(keyTarget, 1)
						// if(keyDrop != keyTarget){
						// 	let valueTarget = 	scope.modelName[keyTarget]
						// 	,	valueFrop	=	scope.modelName[keyDrop]
						// }
					})
				}
			}
		}])
})();