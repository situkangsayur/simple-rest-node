var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/dataMahasiswa");
exports.mongo = mongoose;


students = new mongoose.Schema({
	nim : String,
	nama : String,
	email : String,
	umur : Number
})




exports.model_siswa= mongoose.model('students', students);

