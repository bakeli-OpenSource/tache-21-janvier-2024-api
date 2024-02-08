const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
  nom: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantite: { type: Number, required: true },
  statut: { type: Boolean, required: true },
});

module.exports = mongoose.model('Categorie', categorieSchema);
