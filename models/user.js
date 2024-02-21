const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

  const userSchema = mongoose.Schema({
      nom: {type: String, required: true,},
      prenom: {type: String, required: true, },
      telephone: {type: Number, required: true, },
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      image: {type: Buffer, contentType: String, required: true}

  });

 userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
