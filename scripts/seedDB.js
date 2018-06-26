const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytimes_MERNDB"
);

const articleSeed = [
  {
    headline: "Can Trump Destroy Obama’s Legacy?",
    snippet:
      "The president seems determined to define his time in office by demolishing what his predecessor did.",
    web_url:
      "https://www.nytimes.com/2017/06/23/sunday-review/donald-trump-barack-obama.html",
    pub_date: "2017-06-23T15:20:29+0000"
  },
  {
    headline: "Trump’s Lies vs. Obama’s",
    snippet: "President Trump’s supporters asked us to compare. We did.",
    web_url:
      "https://www.nytimes.com/interactive/2017/12/14/opinion/sunday/trump-lies-obama-who-is-worse.html",
    pub_date: "2017-12-14T12:29:56+0000"
  },
  {
    headline: "Trump’s Lies vs. Obama’s",
    snippet: "Trump supporters asked us to compare. We did.",
    web_url: "https://www.nytimes.com/2017/12/14/opinion/trump-lies-obama.html",
    pub_date: "2017-12-14T13:59:47+0000"
  },
  {
    headline: "How Can Trump Help Iran’s Protesters? Be Quiet.",
    snippet:
      "Public support from the United States government will do the demonstrators more harm than good.",
    web_url:
      "https://www.nytimes.com/2017/12/30/opinion/iran-protests-trump.html",
    pub_date: "2017-12-30T22:18:51+0000"
  },
  {
    headline: "Why Team Trump Needs to Lay Off the Mueller Probe",
    snippet:
      "If it goes to the question of impeachment, Congress will need help.",
    web_url:
      "https://www.nytimes.com/2017/12/11/opinion/trump-mueller-probe.html",
    pub_date: "2017-12-11T19:55:26+0000"
  }
];

db.Article.remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted into Article!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
