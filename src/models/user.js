const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    _id: { 
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
    model: "users", 
    field: "_id",
    startAt: 1,
    incrementBy: 1
  });
module.exports = mongoose.model('users', userSchema);