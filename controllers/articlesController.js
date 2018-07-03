const db = require("../models");

getToken = function(headers) {
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
  findAll: function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      db.Article.find(req.query)
        //.sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },
  findById: function(req, res) {
    var token = getToken(req.headers);
    if (token) {
      db.Article.findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },
  create: function(req, res) {
    if (token) {
      db.Article.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    } else {
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  },

  remove: function(req, res) {
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
