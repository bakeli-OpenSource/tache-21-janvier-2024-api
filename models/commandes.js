const mongoose = require('mongoose');

const commandesSchema = mongoose.Schema({
  email: { type: String, required: true },
  telephone: { type: Number, required: true },
  adresse: { type: String, required: true },
  produit: { type: String, required: true },
  idProduit: { type: String, required: true },
  quantite: { type: Number, required: true },
  date: { type: String, required: true },
  etat: { type: String, required: true },
  prixProduit: { type: Number, required: true },
  prixLivraison: { type: Number, required: true },
  prixTotal: { type: Number, required: true },
});

module.exports = mongoose.model('Commandes', commandesSchema);
