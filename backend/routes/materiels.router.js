const express = require('express');
const router = express.Router();

const materielsCntrl = require('../controllers/materiels.controller');

router.post('/', materielsCntrl.createMaterial);
router.get('/', materielsCntrl.getAllMaterials);
router.put('/:id', materielsCntrl.updateOne);

module.exports = router;