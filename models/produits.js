const mongoose = require('mongoose');

const produitSchema = mongoose.Schema({
  nom: { type: String, required: true },
  image: { type: Buffer, contentType: String, required: true },
  description: { type: String, required: true },
  quantite: { type: Number, required: true },
  carracteristique: { type: String, required: true },
  prix: { type: Number, required: true },
  couleur: { type: String, required: true },
  taille: { type: String, required: true },
  fournisseur: { type: String, required: true },
});

module.exports = mongoose.model('Produit', produitSchema);
