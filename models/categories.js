const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
  nom: { type: String, required: true },
  quantite: { type: Number, required: true },
  date: { type: String, default: Date.now },
});

module.exports = mongoose.model('Categorie', categorieSchema);
