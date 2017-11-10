var Promise = require('bluebird');
var mongoose = require('mongoose');

Schema = mongoose.Schema;

var UserSchema = new Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	timeCreated: {
		type: Date,
		default: Date.now
	},
	timeLastModified: {
		type: Date,
		default: Date.now
	}
});

//mongoose.model('User', UserSchema);
module.exports = mongoose.model('User', UserSchema);