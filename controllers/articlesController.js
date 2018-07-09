const db = require("../models");

getToken = headers => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Defining methods for the articlesController
module.exports = {
  findAll: (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Article.find(req.query)
        //.sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },
  findById: (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Article.findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },
  create: (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      db.Article.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  remove: (req, res) => {
    const token = getToken(req.headers);
    if (token) {
      console.log(req.params.id);
      db.Article.findById({ _id: req.params.id })
        .then(console.log("found it"))
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
};
