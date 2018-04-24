(()=>{
	angular.module('CallDaily')
		.filter('dbData', [ ()=>{
			return value=>(value)?value.split('_').map(item=>item.split('').map( (word, i)=>(i==0)?word.toUpperCase():word).join('')).join(' '):value
		}])
})();