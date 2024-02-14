const mongoose = require('mongoose');

const commandesSchema = mongoose.Schema({
  email: { type: String, required: true },
  quantite: { type: Number, required: true }, // Correction du nom du champ
  date: { type: String, required: true },
  etat: { type: String, required: true },
  prix: { type: Number, required: true },
});

module.exports = mongoose.model('Commandes', commandesSchema);
