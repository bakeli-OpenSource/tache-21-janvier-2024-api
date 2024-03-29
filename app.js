const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());

// _______________________________________
// Ajout des headers pour éviter des erreurs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

const produitRoutes = require('./routes/produit');
app.use('/api/produits', produitRoutes);

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const clientRoutes = require('./routes/client');
app.use('/api/authclient', clientRoutes);

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

// _____________________________________________
// Connexion à la base de données grace à mongoose
mongoose
  .connect(
    'mongodb+srv://kay_solu:ofO8Z7yRQ4j0DS3w@cluster0.dcrcvl0.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// ______________
// Ajout d'un élément dans notre collection Categorie
const Categorie = require('./models/categories');

app.post('/api/categorie', (req, res, next) => {
  delete req.body._id;
  const categorie = new Categorie({
    ...req.body,
  });
  categorie
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
});

// _______________
// Récupération de tous les éléments dans notre collection categorie
app.get('/api/categories', (req, res, next) => {
  Categorie.find()
    .then((categorie) => {
      // Inverser la liste des categories
      const reversedCategorie = categorie.reverse();
      res.status(200).json(reversedCategorie);
    })
    .catch((error) => res.status(400).json({ error }));
});

// ______________
// Suppression d'un élément dans notre collection categorie
app.delete('/api/categorie/:id', (req, res, next) => {
  Categorie.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

// ______________
// Modification d'un élément dans notre collection categorie
app.put('/api/categorie/:id', (req, res, next) => {
  Categorie.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
});

/************************* Partie Commandes *************************/

// ______________
// Ajout d'un élément dans notre collection commande
const Commandes = require('./models/commandes');

app.post('/api/commande', (req, res, next) => {
  delete req.body._id;
  const commande = new Commandes({
    ...req.body,
  });
  commande
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
});

// _______________
// Récupération de tous les éléments dans notre collection commande
app.get('/api/commandes', (req, res, next) => {
  Commandes.find()
    .then((commande) => {
      // Inverser la liste des commandes
      const reversedCommande = commande.reverse();
      res.status(200).json(reversedCommande);
    })
    .catch((error) => res.status(400).json({ error }));
});

// _______________
// Récupération d'un élément dans notre collection Commande
app.get('/api/commandes/:id', (req, res, next) => {
  Commandes.findOne({
    _id: req.params.id,
  })
    .then((commande) => {
      res.status(200).json(commande);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});

// ______________
// Suppression d'un élément dans notre collection commande

app.delete('/api/commande/:id', (req, res, next) => {
  Commandes.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

// ______________
// Modification d'un élément dans notre collection commande
app.put('/api/commande/:id', (req, res, next) => {
  Commandes.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
});

/*********************** Client *************************/
const Clients = require('./models/client');
app.get('/api/client', (req, res, next) => {
  Clients.find()
    .then((client) => {
      // Inverser la liste des client
      const reversedClient = client.reverse();
      res.status(200).json(reversedClient);
    })
    .catch((error) => res.status(400).json({ error }));
});

/************************* Partie Messages *************************/

// ______________
// Ajout d'un élément dans notre collection Messages
const Message = require('./models/message');

app.post('/api/messages', (req, res, next) => {
  delete req.body._id;
  const message = new Message({
    ...req.body,
  });
  message
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
});

// _______________
// Récupération de tous les éléments dans notre collection Message
app.get('/api/messages', (req, res, next) => {
  Message.find()
    .then((messages) => {
      // Inverser la liste des messages
      const reversedMessages = messages.reverse();
      res.status(200).json(reversedMessages);
    })
    .catch((error) => res.status(400).json({ error }));
});

// _______________
// Récupération d'un élément dans notre collection Message
app.get('/api/messages/:id', (req, res, next) => {
  Message.findOne({
    _id: req.params.id,
  })
    .then((produit) => {
      res.status(200).json(produit);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
});

// ______________
// Suppression d'un élément dans notre collection message

app.delete('/api/messages/:id', (req, res, next) => {
  Message.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

// ______________
// Modification d'un élément dans notre collection message
app.put('/api/messages/:id', (req, res, next) => {
  Message.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
