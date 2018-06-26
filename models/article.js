const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: { type: String, required: true },
  snippet: { type: String, required: true },
  web_url: { type: String, required: true },
  pub_date: { type: String, required: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
