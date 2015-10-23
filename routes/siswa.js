var data = require('./../data_siswa');


exports.allsiswa = function(req, res){
		
	data.model_siswa.find({}, function(err,docs){
		if(err){
			res.json({"code" : 407, "status" : "blablabla"});
		}else{
			res.json(docs)			
		}

	})
}

exports.search_by_nim =  function(req, res){
	var req_data =req.params;
	data.model_siswa.find({nim : req_data.nim}, function(err,docs){
		if(err){
			res.json({"code" : 407, "status" : "error saat pencarian"});
		}else{
			if(docs == ""){
			  res.json({"code" : 409, "status" : "data tidak ditemukan"});
			}else{
			  res.json(docs)							
			}

		}

	})
}


exports.addsiswa = function(req, res){
	var req_data = req.body;
	
	if((req_data.nama == null)|| (req_data.umur == null) || (req_data.email == null) ||(req_data.umur == null)){
		res.json({"code" : 405, "status" : "field tidak kumplit"});
	} else{
		new data.model_siswa({nim : req.body.nim,
				  nama : req_data.nama,
				  email  : req_data.email,
				  umur : req_data.umur
		}).save(function(err, doc){
					  if(err){
						res.json({"code" : 404, "status" : "tambah data gagal"});
					  }else{
					  	res.json({"code" : 0, "status" : "success"});
					  }
				  });		
	}
	
}

exports.update = function(req, res){
	var req_data = req.body;
	
	if((req_data.nama == null)|| (req_data.umur == null) || (req_data.email == null) ||(req_data.umur == null)){
		res.json({"code" : 405, "status" : "field tidak kumplit"});
	} else{
		data.model_siswa.update(
			{
				nim : req.params.nim,
			},
			{
				  nim : req.body.nim,
				  nama : req_data.nama,
				  email  : req_data.email,
				  umur : req_data.umur
		}, function(err){
					  if(err){
						res.json({"code" : 502, "status" : "update data gagal"});
					  }else{
					  	res.json({"code" : 0, "status" : "success"});
					  }
				  });		
	}
	
}

exports.delete = function(req, res){

		data.model_siswa.remove(
			{
				nim : req.params.nim,
			}, function(err){
					  if(err){
						res.json({"code" : 501, "status" : "delete data gagal"});
					  }else{
					  	res.json({"code" : 0, "status" : "success"});
					  }
				  });		
	
}

