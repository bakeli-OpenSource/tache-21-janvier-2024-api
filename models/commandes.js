const mongoose = require('mongoose');

const commandesSchema = mongoose.Schema({
  email: { type: String, required: true },
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  telephone: { type: Number, required: true },
  adresse: { type: String, required: true },
  produit: { type: Array, required: true },
  idProduit: { type: Array, required: true },
  quantite: { type: Array, required: true },
  date: { type: String, required: true },
  etat: { type: String, required: true },
  prixProduit: { type: Array, required: true },
  prixLivraison: { type: Number, required: true },
  prixTotal: { type: Number, required: true },
  imageUrl: { type: Array, required: true },
  lu: { type: Boolean, required: true },
  numeroCommande: {
    type: Number,
    default: Math.floor(Math.random() * 100000000),
  },
});

module.exports = mongoose.model('Commandes', commandesSchema);
