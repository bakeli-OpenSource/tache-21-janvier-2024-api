const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const produitCtrl = require('../controllers/produit');

router.get('/', produitCtrl.getAllProduit);
router.post('/', multer, produitCtrl.createProduit);
router.get('/:id', produitCtrl.getOneProduit);
router.put('/:id', multer, produitCtrl.modifyProduit);
router.delete('/:id', produitCtrl.deleteProduit);

module.exports = router;

// const express = require('express');
// const router = express.Router();

// const auth = require('../middleware/auth');

// const multer = require('../middleware/multer-config');

// const produitCtrl = require('../controllers/produit');

// router.get('/', auth, produitCtrl.getAllProduit);
// router.post('/', auth, produitCtrl.createProduit);
// router.get('/:id', auth, produitCtrl.getOneProduit);
// router.put('/:id', auth, multer, produitCtrl.modifyProduit);
// router.delete('/:id', auth, produitCtrl.deleteProduit);

// module.exports = router;
