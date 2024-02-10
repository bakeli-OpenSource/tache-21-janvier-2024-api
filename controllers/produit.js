const Produit = require('../models/produit');

const fs = require('fs');

exports.createProduit = (req, res, next) => {
  const objetProduit = JSON.parse(req.body.produit);
  delete objetProduit._id;
  delete objetProduit._userId;
  const produit = new Produit({
    ...objetProduit,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
  });
  produit
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Produit saved successfully!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneProduit = (req, res, next) => {
  Produit.findOne({
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
};

exports.modifyProduit = (req, res, next) => {
  const objetProduit = req.file
    ? {
        ...JSON.parse(req.body.produit),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete objetProduit._userId;
  Produit.findOne({ _id: req.params.id })
    .then((produit) => {
      if (produit.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Produit.updateOne(
          { _id: req.params.id },
          { ...objetProduit, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteProduit = (req, res, next) => {
  Produit.findOne({ _id: req.params.id })
    .then((produit) => {
      const filename = produit.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Produit.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: 'Objet supprimé !' });
          })
          .catch((error) => res.status(401).json({ error }));
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllProduit = (req, res, next) => {
  Produit.find()
    .then((produits) => {
      res.status(200).json(produits);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
