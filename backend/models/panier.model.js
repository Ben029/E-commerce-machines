// import { Types, Schema, model } from 'mongoose';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const panierSchema = mongoose.Schema({
    materiels: [{
        type: ObjectId,
        ref: 'MaterielPanier'
    }]
});

module.exports = mongoose.model('Panier', panierSchema);
// export default model('Panier', panierSchema);
