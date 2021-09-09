// import { Types, Schema, model } from 'mongoose';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const panierSchema = mongoose.Schema({
    materiels: [{
        type: ObjectId,
        ref: 'materielpanier'
    }]
});

module.exports = mongoose.model('panier', panierSchema);
// export default model('Panier', panierSchema);