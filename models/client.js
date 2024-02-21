const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const clientSchema = mongoose.Schema({
  prenom: { type: String, required: true },
  nom: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adresse: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

clientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Client', clientSchema);
