var var mongoose = require('mongoose');

Schema = mongoose.Schema;

var OrderSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	quantity: {
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
	},
	status: {
		type: String,
		default: 
	}

});