const mongoose = require('mongoose');

const produitSchema = mongoose.Schema({
  nom: { type: String, required: true },
  imageUrl: { type: String, required: true },
  titre: { type: String, required: true },
  description: { type: String, required: true },
  quantite: { type: Number, required: true },
  categorie: { type: String, required: true },
  categorieId: { type: String, required: true },
  carracteristique: { type: String, required: true },
  prix: { type: Number, required: true },
  couleur: { type: String, required: true },
  taille: { type: String, required: true },
  fournisseur: { type: String, required: true },
  promo: { type: Number, required: true },
  vente: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Produit', produitSchema);
