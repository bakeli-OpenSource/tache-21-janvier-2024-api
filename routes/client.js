const express = require('express');
const router = express.Router();

const clientCtrl = require('../controllers/client');
const authMiddleware = require('../middleware/auth');
const Client = require('../models/client');

router.post('/signup', clientCtrl.signup);
router.post('/login', clientCtrl.login);

// route protégée nécessitant une authentification
router.get('/profile', authMiddleware, (req, res) => {
  Client.findById(req.auth.userId) // Recherche de l'utilisateur par son ID
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Client non trouvé' });
      }
      // Si l'utilisateur est trouvé, renvoyer toutes ses informations
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: 'Erreur lors de la récupération du client' });
    });
});

router.put('/profile', authMiddleware, (req, res) => {
  // Récupérer les valeurs à mettre à jour à partir du corps de la requête
  let updateValues = { ...req.body };

  // Supprimer les propriétés qui ne doivent pas être mises à jour
  delete updateValues._id;
  delete updateValues._userId;

  // Mettre à jour l'utilisateur
  Client.findOneAndUpdate({ _id: req.auth.userId }, updateValues, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json({ message: 'Utilisateur modifié!', user });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = router;
