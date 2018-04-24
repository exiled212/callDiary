(()=>{

	require('rootpath')()

	const	path	=	require('path')
	,		fs		=	require('fs')
	,		Q		=	require('q')
	,		xlsx	=	require('node-xlsx')

	,		Perfil 	= 	require(path.join('private', 'module', 'admin', 'model', 'Perfil.js'))

	let 	newDir = (pathFile)=>{
				try {
					fs.mkdir(pathFile)
				} catch (error) {
					console.log(error.message)
				}
			}

	,		existPath = (pathFile)=>{
				try {
					fs.statSync(pathFile)
					return true
				} catch (error) {
					return false
				}
			}

	,		isFile = (pathFile)=>{
				try {
					return fs.statSync(pathFile).isFile()
				} catch (error) {
					return false
				}
			}

	,		listDir = (pathFile)=>{
				try {
					return fs.readdirSync(pathFile)
				} catch (error) {
					return [];
				}
			}
	


	module.exports = {

		docs: (req, res)=>{
					let		pathFile	=	path.join('public', 'download', 'docs')
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
				},

		xlsxUser: (req, res)=>{
					let		id			=	req.params.id
					,		pathFile	=	path.join('public', 'upload', 'xlsx', id+'')
					,		tempTree 	=	{}
					,		tree 		=	[]
					,		dates		=	[]


					//Validar si existe la ruta
					if(!existPath(pathFile)) return res.status(200).send({status:'success', tree});
					//Validar si es un directorio
					if(isFile()) return res.status(200).send({status:'success', tree});


					dates = listDir(pathFile)

					for(let i in dates){
						let 	row			=	dates[i]
						,		xlsxList	=	listDir(path.join(pathFile, row))
						,		xlsxDic		=	{}
						for(let i in xlsxList){
							let row = xlsxList[i]
							xlsxDic[row] = 1
						}
						tempTree[row] = xlsxDic
					}

					Perfil.findOne({_id:id}, (err, data)=>{
						let 	treeRow = 	{}
						,		result 	=	[]
						,		date 	= 	new Date()

						date = `${date.getFullYear()}-${ ("0"+ ( date.getMonth()+1 )).slice(-2) }-${ ("0"+date.getDate()).slice(-2) }`
						if(tempTree[date] == undefined){
							newDir(path.join(pathFile, date))
							tempTree[date] = {}
						}
						treeRow[`${data.nombres} ${data.apellidos}`] = tempTree
						for(let i in treeRow){
							let userList = treeRow[i]
							,	userPath 	=	i
							,	indexA		=	0
							result[0] = {name:i, list:[]}
							for(let i in userList){
								let dateList 	= 	userList[i]
								,	datePath	=	i
								,	indexB 		=	0
								result[0].list[indexA] = {name:i, list:[]}
								for(let i in dateList ){
									result[0].list[indexA].list[indexB] = {name:i, path:path.join(pathFile, userPath, datePath, i)}
									indexB++
								}
								indexA++
							}
						}
						return res.status(200).send({status:'success', files:result});
					})
				}
		
	}

})();