const mongoose = require('mongoose');
const Material = require('./materiel.model');
const ObjectId = mongoose.Types.ObjectId;

const panierSchema = mongoose.Schema({
    materiels: {
        type: ObjectId,
        ref: 'Material'
    },
    nombreDeCommande: {
        type: Number
    }
});

module.exports = mongoose.model('Panier', panierSchema);