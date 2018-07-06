import axios from "axios";

export default {
  // Gets all books
  searchNYTimes: (topic, startDate, endDate) => {
    const apiKey = "9687a0cdbd11479386b098e326eb223c";
    const queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
      apiKey +
      "&q=" +
      topic +
      "&begin_date=" +
      startDate +
      "&end_date=" +
      endDate;
    console.log(queryURL);
    return axios.get(queryURL);
  },

  getSavedArticles: function() {
    return axios.get("/api/articles");
  },

  // Deletes the article with the given id.
  deleteArticle: function(id) {
    console.log("ID: " + id);
    return axios.delete("/api/articles/" + id);
  },
  //Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  //checks login credentials against database.
  loginSubmit: function(loginData) {
    return axios.post("/api/auth/login", loginData);
  },
  //registers a new user into the database.
  registerSubmit: function(registerData) {
    return axios.post("/api/auth/register", registerData);
  }
};
