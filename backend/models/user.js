const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Panier = require('./panier.model').default;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
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
