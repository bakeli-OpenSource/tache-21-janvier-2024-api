const Produit = require('../models/produit');

const fs = require('fs');

exports.createProduit = (req, res, next) => {
  const objetProduit = {
    nom: req.body.nom,
    imageUrl: req.body.imageUrl,
    titre: req.body.titre,
    description: req.body.description,
    quantite: req.body.quantite,
    categorie: req.body.categorie,
    categorieId: req.body.categorieId,
    carracteristique: req.body.carracteristique,
    prix: req.body.prix,
    couleur: req.body.couleur,
    taille: req.body.taille,
    fournisseur: req.body.fournisseur,
    promo: req.body.promo,
  };

  delete objetProduit._id;
  delete objetProduit._userId;

  const produit = new Produit({
    ...objetProduit,
    // userId: req.auth.userId,
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
  // Récupérer les valeurs à mettre à jour à partir du corps de la requête
  let updateValues = { ...req.body };

  // Supprimer les propriétés qui ne doivent pas être mises à jour
  delete updateValues._id;
  delete updateValues._userId;

  // Si une nouvelle image est fournie, mettre à jour l'URL de l'image
  if (req.file) {
    updateValues.imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;
  } else {
    // Si aucune nouvelle image n'est fournie, ne pas modifier l'URL de l'image
    delete updateValues.imageUrl;
  }

  Produit.findOneAndUpdate({ _id: req.params.id }, updateValues, { new: true })
    .then((produit) => {
      if (!produit) {
        return res.status(404).json({ message: 'Produit non trouvé' });
      }
      res.status(200).json({ message: 'Produit modifié!', produit });
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

exports.getProduitsByCategorie = async (req, res) => {
  const categorieId = req.params.categorieId;

  try {
    const produits = await Produit.find({ categorieId: categorieId });
    res.json(produits);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des produits" });
  }
};