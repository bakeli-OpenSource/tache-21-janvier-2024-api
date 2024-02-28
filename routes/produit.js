const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const multer = require('../middleware/multer-config');

const produitCtrl = require('../controllers/produit');

// Récupérer tous les produits ayant le même categorieId
router.get('/:categorieId', produitCtrl.getProduitsByCategorie);

router.get('/', produitCtrl.getAllProduit);
router.post('/', multer, produitCtrl.createProduit);
router.get('/:id', produitCtrl.getOneProduit);
router.put('/:id', multer, produitCtrl.modifyProduit);
router.delete('/:id', produitCtrl.deleteProduit);

module.exports = router;
