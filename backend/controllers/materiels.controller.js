const Material = require('../models/materiel.model');

exports.getAllMaterials = (req, res, next) => {
    Material.find().then(
            (materiel) => {
                req.status(200).json(materiel);
            }
        )
        .catch(
            (err) => {
                res.status(400).json({ 'erreur': err });
            }
        )
};


exports.getOneMaterial = (req, res, next) => {
    Material.findOne({ _id: req.params.id })
        .then(
            (materiel) => {
                res.status(200).json(materiel);
            }
        )
        .catch(
            (err) => {
                res.status(400).json({ 'erreur': err });
            }
        )
};

exports.createMaterial = (req, res, next) => {
    const materielObject = JSON.parse(req.body.materiel);
    delete materielObject._id;
    // const materiel = 
}