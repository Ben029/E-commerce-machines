const Material = require('../models/materiel.model');

exports.getAllMaterials = (req, res, next) => {
    Material.find().then(
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
    const materielObject = req.body;
    // delete materielObject._id;
    const materiel = new Material({
        type: req.body.type,
        mark: req.body.mark,
        description: req.body.description,
        price: req.body.price,
        nbrInStock: req.body.nbrInStock,
        imgUrl: req.body.imgUrl,
        added: req.body.added,
        nbreInPanier: req.body.nbreInPanier,
    })

    materiel.save().then(
            () => {
                res.status(201).json({
                    message: 'Post saved successfully !'
                });
            }
        )
        .catch(
            (error) => {
                res.status(400).json({ error: error })
            }
        )
}

exports.updateOne = (req, res, next) => {
    const newMateriel = {...req.body };

    Material.updateOne({ _id: req.params.id }, {...newMateriel })
        .then(
            () => {
                res.json({ success: true, message: 'Materiel update successful' });
            })
        .catch(err => res.status(500).json({ err }));
}