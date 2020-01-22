const mongoose = require('mongoose');

// schema how my data looks
const UserSchema = mongoose.Schema({
	uname:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	pwd:{
		type:String,
		required:true
	}
});

module.exports = mongoose.model('Post',UserSchema);