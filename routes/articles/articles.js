const router = require("express").Router();
const passport = require("passport");
require("../../config/passport")(passport);

const articlesController = require("../../controllers/articlesController");

//Matches with "/api/articles"
router
  .route("/")
  .get(
    passport.authenticate("jwt", { session: false }),
    articlesController.findAll
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    articlesController.create
  );

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    articlesController.findById
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    articlesController.remove
  );

module.exports = router;
