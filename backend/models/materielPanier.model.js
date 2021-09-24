const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const materielPanier = mongoose.Schema({
    materiel: {
        type: ObjectId,
        ref: 'Material'
    },
    nombreDeCommande: {
        type: Number
    }
});

module.exports = mongoose.model('MaterielPanier', materielPanier);
