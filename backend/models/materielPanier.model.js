const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const materielPanier = mongoose.Schema({
    materiel: {
        type: ObjectId,
        ref: 'material'
    },
    nombreDeCommande: {
        type: Number
    }
});

module.exports = mongoose.model('materielpanier', materielPanier);