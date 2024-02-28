const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  prenomNom: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  lu: { type: Boolean, default: false },
  vu: { type: Boolean, default: false },
});

module.exports = mongoose.model('Message', messageSchema);
