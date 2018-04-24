(()=>{

	require('rootpath')()

	const 	path		=	require('path')
	,		mongoose 	= 	require(path.join('private', 'module', 'Model.js'))
	,		Schema		=	mongoose.Schema


	schema = new Schema({
		nombres:			{type:String, index: {unique:false	}},
		apellidos:			{type:String, index: {unique:false	}},
		tipo_documento:		{type:String, index: {unique:false	}},
		documento:			{type:Number, index: {unique:true	}},
		estrato:			{type:Number, index: {unique:false	}},
		direccion:			{type:String, index: {unique:false	}},
		caja_predial:		{type:String, index: {unique:false	}},
		megas:				{type:Number, index: {unique:false	}},
		telefono_uno:		{type:Number, index: {unique:false	}},
		telefono_dos:		{type:Number, index: {unique:false	}},
		telefonos:			{type:String, index: {unique:false	}},
		cupo:				{type:Number, index: {unique:false	}}
	})


	schema.pre('save', function(next){
		let telefonosArray = this.telefonos.split('-').map(tel=>tel.trim()*1)
		this.telefono_uno = telefonosArray[0]
		this.telefono_dos = telefonosArray[1]
		next();
	})

	module.exports = mongoose.model('xlsxData', schema)

})();