const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  prenomNom: { type: String, required: true },
  telephone: { type: Number, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
