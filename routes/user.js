const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// route protégée nécessitant une authentification
router.get('/profile', authMiddleware, (req, res) => {
  User.findById(req.auth.userId) // Recherche de l'utilisateur par son ID
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      // Si l'utilisateur est trouvé, renvoyer toutes ses informations
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'utilisateur" });
    });
});

module.exports = router;
