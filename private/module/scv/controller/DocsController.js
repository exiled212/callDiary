(()=>{

	require('rootpath')()

	const	path	=	require('path')
	,		fs		=	require('fs')
	,		Q		=	require('Q')
	,		xlsx	=	require('node-xlsx')


	module.exports = {

		docs: (req, res)=>{
					let		user		=	req.user
					,		pathFile	=	path.join('public', 'download', 'docs')
					,		listDate	=	[]
					,		listCsv		=	[]
					,		listHuman	=	{}
					,		paths		=	[]
					try {
						listDate =  fs.readdirSync(pathFile)
					} catch (error) {console.log(error)}

					listDate.map(item=>{
						let humanPath = path.join(pathFile, item)
						try {
							listHuman[item] = fs.readdirSync(humanPath)
						} catch (error) {console.log(error)}
					})

					for(let i in listHuman){
						let rowOne = {}
						let date = listHuman[i]
						rowOne.name = i
						rowOne.list = []
						date.map(human=>{
							let rowTwo = {}
							rowTwo.name = human
							rowTwo.list = []
							rowOne.list.push(rowTwo)
							let cscPath = path.join(pathFile, i, human)
							try {
								listCsv = fs.readdirSync(cscPath)
								listCsv.map(csv=>{
									let rowThree = {}
									rowThree.name = csv
									rowThree.path = `download/docs/${i}/${human}/${csv}`
									rowThree.read = xlsx.parse(path.join(pathFile, i, human, csv))
									rowTwo.list.push(rowThree)
								})
							} catch (error) {console.log(error)}
						})
						paths.push(rowOne)
					}

					return res.status(200).send({status:'success', files:{paths}});
				}
		
	}

})();