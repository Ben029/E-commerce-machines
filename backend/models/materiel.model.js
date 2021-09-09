const mongoose = require('mongoose');

const materielSchema = mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    mark: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    nbrInStock: {
        type: Number,
        require: true
    },
    imgUrl: {
        type: String,
        require: true,
    },
    added: {
        type: Boolean,
        require: true
    },
    nbreInPanier: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('material', materielSchema);