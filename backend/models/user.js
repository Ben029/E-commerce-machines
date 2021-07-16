const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Panier = require('./panier.model');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    panier: {
        type: Array
    },
    wallet: {
        type: Number
    },
    isAuth: {
        type: Boolean
    },
    image: {
        type: String
    }

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);