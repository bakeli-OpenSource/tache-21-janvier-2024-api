const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const Produit = require('./models/produits');
const Categorie = require('./models/categories');
const Commandes = require('./models/commandes');

// _____________________________________________
// Connexion à la base de données grace à mongoose
mongoose
  .connect(
    'mongodb+srv://kay_solu:ofO8Z7yRQ4j0DS3w@cluster0.dcrcvl0.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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

// ________________________________________
// Ajout d'un élément dans notre collection Produit
app.post('/api/produit', (req, res, next) => {
  delete req.body._id;
  const produit = new Produit({
    ...req.body,
  });
  produit
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
});

// _________________________________________
// Récupération d'un seul élément dans notre collection produit
app.get('/api/produit/:id', (req, res, next) => {
  Produit.findOne({ _id: req.params.id })
    .then((produit) => res.status(200).json(produit))
    .catch((error) => res.status(404).json({ error }));
});

// _________________________________________
// Récupération de tous les éléments dans notre collection produit
app.get('/api/produits', (req, res, next) => {
  Produit.find()
    .then((produits) => res.status(200).json(produits))
    .catch((error) => res.status(400).json({ error }));
});

// ________________________________________
// Modification d'un élément dans notre collection produit
app.put('/api/produit/:id', (req, res, next) => {
  Produit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
});

// ________________________________________
// Suppression d'un élément dans notre collection produit
app.delete('/api/produit/:id', (req, res, next) => {
  Produit.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;


// ________________________________________
// Ajout d'un élément dans notre collection Categorie
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



// _________________________________________
// Récupération de tous les éléments dans notre collection categorie
app.get('/api/categories', (req, res, next) => {
  Categorie.find()
    .then((categories) => res.status(200).json(categories))
    .catch((error) => res.status(400).json({ error }));
});


// ________________________________________
// Suppression d'un élément dans notre collection categorie
app.delete('/api/categorie/:id', (req, res, next) => {
  Categorie.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;

// ________________________________________
// Ajout d'un élément dans notre collection Commade
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

// _________________________________________
// Récupération d'un seul élément dans notre collection Commade
app.get('/api/commande/:id', (req, res, next) => {
  Commandes.findOne({ _id: req.params.id })
    .then((commande) => res.status(200).json(commande))
    .catch((error) => res.status(404).json({ error }));
});

// _________________________________________
// Récupération de tous les éléments dans notre collection Commade
app.get('/api/commande', (req, res, next) => {
  Commandes.find()
    .then((commandes) => res.status(200).json(commandes))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;

// Suppression d'un élément dans notre collection categorie
app.delete('/api/commande/:id', (req, res, next) => {
  Commandes.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
