const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// router.put('/addPanier/:id', userCtrl.addPanier);
router.put('/updateUser/:idUser/:idMateriel', userCtrl.updateUser);

module.exports = router;