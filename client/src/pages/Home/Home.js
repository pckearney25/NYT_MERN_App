import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Row, Col } from "../../components/Grid";
import { SearchList, SearchListItem } from "../../components/SearchList/";
import { SavedList, SavedListItem } from "../../components/SavedList/";
import axios from "axios";
import API from "../../utils/API";
import "./Home.css";

class Home extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: "",
    startDate: "",
    endDate: ""
  };

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );

    this.loadSavedArticles();
  }

  loadSavedArticles = () => {
    API.getSavedArticles()
      .then(res => {
        console.log(res.data);
        this.setState({ savedArticles: res.data });
      })
      .catch(error => {
        if (error.response.status === 401) {
          //Again, what is going on  here???
          this.props.history.push("/login");
        }
      });
  };

  deleteArticle = id => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  saveArticle = articleData => {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "jwtToken"
    );
    API.saveArticle(articleData)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get articles, update the articles state
    event.preventDefault();
    this.setState({
      articles: []
    });

    API.searchNYTimes(
      this.state.topic,
      this.state.startDate,
      this.state.endDate
    )
      .then(results => {
        const searchData = [];
        let searchRecord = {};
        let i = 0;
        if (results) {
          console.log(
            "Number of results: " + results.data.response.docs.length
          );
          while (i < results.data.response.docs.length || i < 10) {
            searchRecord = {
              _id: i,
              headline: results.data.response.docs[i].headline.main,
              snippet: results.data.response.docs[i].snippet,
              web_url: results.data.response.docs[i].web_url,
              pub_date: results.data.response.docs[i].pub_date
            };
            i++;
            searchData.push(searchRecord);
          }
        }
        console.log(searchData);
        this.setState({ articles: searchData });
      })
      .catch(err => console.log(err));
    this.setState({
      topic: "",
      startDate: "",
      endDate: ""
    });
    console.log(this.state.articles);
  };

  logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Jumbotron />
        <Container>
          <h4> Search Form: </h4>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="md-12">
                      <Input
                        label="Topic:"
                        placeholder="Search Topic"
                        name="topic"
                        value={this.state.topic}
                        onChange={this.handleInputChange}
                      />
                      <Input
                        label="Search Start Date:"
                        placeholder="YYYYMMDD"
                        name="startDate"
                        value={this.state.startDate}
                        onChange={this.handleInputChange}
                      />
                      <Input
                        label="Search End Date:"
                        placeholder="YYYYMMDD"
                        name="endDate"
                        value={this.state.endDate}
                        onChange={this.handleInputChange}
                      />
                      <Button
                        onClick={this.handleFormSubmit}
                        type="primary"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
        </Container>
        <Container className="searchContainer">
          <h4> Search Results: </h4>
          {!this.state.articles.length ? (
            <h6 className="text-left">
              Currently there are no articles to display.
            </h6>
          ) : (
            <SearchList>
              {this.state.articles.map(article => {
                return (
                  <SearchListItem
                    key={article._id}
                    articles={this.state.articles}
                    _id={article._id}
                    headline={article.headline}
                    snippet={article.snippet}
                    web_url={article.web_url}
                    pub_date={article.pub_date}
                    saveArticle={this.saveArticle}
                  />
                );
              })}
            </SearchList>
          )}
        </Container>
        <Container className="savedContainer">
          <h4> Saved Articles: </h4>
          {!this.state.savedArticles.length ? (
            <h6 className="text-left">
              Currently there are no saved articles to display.
            </h6>
          ) : (
            <SavedList>
              {this.state.savedArticles.map(saved => {
                return (
                  <SavedListItem
                    key={saved._id}
                    _id={saved._id}
                    headline={saved.headline}
                    snippet={saved.snippet}
                    web_url={saved.web_url}
                    pub_date={saved.pub_date}
                    deleteArticle={this.deleteArticle}
                  />
                );
              })}
            </SavedList>
          )}
        </Container>
        <Container>
          <h4> Leave Application: </h4>
          <button className="btn btn-primary" onClick={this.logout}>
            Logout
          </button>
        </Container>
      </div>
    );
  }
}

export default Home;
