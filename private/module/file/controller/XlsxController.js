(()=>{

	require('rootpath')()

	const	path		=	require('path')
	,		xlsx		=	require('node-xlsx')
	,		Q			=	require('q')

	,		Perfil 		= 	require(path.join('private', 'module', 'admin', 'model', 'Perfil.js'))
	,		XlsxData 	= 	require(path.join('private', 'module', 'file', 'model', 'XlsxData.js'))

	,		uploadPath 	= path.join('public', 'upload', 'xlsx')

	module.exports = {


		/** 
		 * Action que permite leer el Excel y manipula la 
		 * estructura de los datos para facilitar su manejo en el frontend
		*/
		load(req, res){
			let 	file 		= 	req.files.file
			, 		xlsxData 	= 	xlsx.parse(file.path)
			,		result		=	[]

			//Contruimos el formato del json deseado desde las librerias y cabeceras
			for(let i in xlsxData){
				let 	lib			= 	xlsxData[i]
				,		row 		= 	lib.data[0]
				,		rowFormat 	= 	{}
				, 		rowHeads	= 	[]
				
				rowFormat.id 	= i
				rowFormat.lib 	= lib.name

				for(let i in row){
					let value 		= row[i]
					,	rowFormat 	= {}

					rowFormat.row 	= value
					rowFormat.id	= i

					rowHeads.push(rowFormat)
				}
				rowFormat.data 	= rowHeads
				result.push(rowFormat)
			}

			//Agregamos los valores de los campos al nuevo formato
			for(let i in result){
				let lib = result[i]
				for(let i in lib.data){
					
					let data		= lib.data[i]
					, 	xlsxDataRow = xlsxData[lib.id].data

					if(!result[lib.id].data[data.id]) continue;
					result[lib.id].data[data.id].column = []
					for(let i in xlsxDataRow){
						if(i == 0) continue;
						let xlsxRow = xlsxDataRow[i]
						result[lib.id].data[data.id].column.push( (xlsxRow[data.id])?xlsxRow[data.id]:null )
					}
				}
			}

			res.status(200).send({status:'success', file:result})
		},


		getRowDb(req, res){
			let rows 		= 	XlsxData.schema.obj
			,	rowsHead	=	[]
		
			for(let i in rows){
				if(i == 'telefono_uno' || i == 'telefono_dos') continue;
				rowsHead.push(i)
			}
			
			res.status(200).send({status:'success', rowsHead})
		},
		
		
		insertXlsx(req, res){
			let body = req.body
			,	dbFormat =		[]
			,	result 		=	[]
			,	rows 		=	[]
			,	rowStatus 	=	[]
			,	deferred	=	Q.defer()

			body.map(list=>list.data.map( (value, o)=>{
				if(!dbFormat[o]) dbFormat[o] = {};
				return dbFormat[o][list.dbRow] = value
			} ))

			dbFormat = dbFormat.filter(item=>item.documento != null)

			dbFormat.map((row, i)=>{
				let model = new XlsxData(row)
				result[i] = model.save(err=>{
					let message = (err)?err.message:'Registro Completado'
					,	status = (err)?'error':'success'

					rowStatus.push({ model , message, status})
					XlsxData.count({}, (err, count)=>{
						if(count == rowStatus.length){
							deferred.resolve(rowStatus)
						}
					})
				})
			})
			Promise.all(result)

			deferred.promise.then(result=>{
				res.status(200).send({status:'success', result})
			})
		}
	}

})();