const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Panier = require('../models/panier.model');
const Material = require('../models/materiel.model');
const MaterielPanier = require('../models/materielPanier.model');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const materiel = new Material({
                type: 'Ecran',
                mark: 'Acer',
                description: 'Ecran 22" Full HD',
                price: 1200,
                nbrInStock: 4,
                imgUrl: '',
                added: false,
                nbreInPanier: 0
            });

            const matPanier = new MaterielPanier({
                materiel: materiel._id,
                nombreDeCommande: 0
            });

            matPanier.save().
            then(() => {
                    console.log('ok');
                })
                .catch(err => {
                    console.log('erreeur: ', err.message);
                })

            const panier = new Panier({
                materiels: [matPanier._id]
            });

            console.log('panier atsika : ', panier.materiels);

            const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                wallet: 25000,
                isAuth: true,
                image: ''
            });

            panier._id = user._id;

            panier.save()
                .then(() => console.log('panier creer'))
                .catch(err => console.log('error create panier : ', err));

            user.save()
                .then(() => res.json(user))
                .catch(err => res.json({ message: 'erreur save : ' + err }));
        })
        .catch(err => res.status(500).json({ status: false, message: 'Erreur hash  :' + err }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .populate({
            path: 'panier',
            populate: {
                path: "materiels",
                populate: {
                    path: "materiel"
                }
            }
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvée !' });
            }
            console.log('uss : ', user.panier.materiels);
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    } else {
                        console.log('tab vavao : ', user.panier);
                        res.status(200).json({
                            user: user,
                            token: jwt.sign({ userId: user._id },
                                'RANDOM_TOKEN_SECRET', { expiresIn: '24h' },
                            )
                        });
                    }
                })
                .catch(err => res.status(500).json({ message: 'erreur compare : ', err }));
        })
        .catch(err => res.status(500).json({ message: 'Erreur find : ', err }));
};

exports.updateUser = (req, res, next) => {
    console.log('caca 1');
    console.log('idd : ' + req.params.idUser)
    User.findOne({ _id: req.params.idUser })
        .then(user => {
            if (!user) {
                res.json({ success: false, message: 'User not found' });
            } else {
                console.log('caca ddbe taknin')

                let newMateriel = req.body;

                Panier.findOne({ _id: user.panier._id })
                    .then(panier => {
                        if (!panier) {
                            res.json({ success: false, message: 'Panier not found' })
                        } else {
                            panier.materiels.push(newMateriel);
                        }
                    })

                console.log('newMateriel : ', newMateriel);

                user.panier.push(req.params.idMateriel);
                console.log('panier kely : ', user.panier)
                user.save()
                    .then(() => {
                        console.log('ok bonne')
                        res.json({ success: true, message: 'OK', data: user });
                    })
                    .catch(err => {
                        res.json({ success: false, message: 'Error add panier' + err.message });
                    })
            }
        })
        .catch(err => {
            console.log('cacacacacaca')
            res.json({ success: false, message: 'Error add panier' + err.message })
        });
};
