import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Row, Col } from "../../components/Grid";
import { SearchList, SearchListItem } from "../../components/SearchList/";
import { SavedList, SavedListItem } from "../../components/SavedList/";
import API from "../../utils/API";
import "./Home.css";

class Home extends Component {
  state = {
    articles: [],
    savedArticles: [
      {
        headline: "Trump’s ‘Obsession With Obama’",
        snippet:
          "“Lacking the grace, skill, empathy, humor, work ethic, knowledge, tact, thick skin and fitness for the job,” the president envies his predecessor.",
        web_url: "https://www.nytimes.com/2017/10/18/opinion/trump-obama.html",
        pub_date: "2017-10-18T18:55:03+0000"
      },
      {
        headline: "Revenge of the Obama Coalition",
        snippet:
          "The resistance is transforming local politics. But it probably won’t stop there.",
        web_url:
          "https://www.nytimes.com/2017/11/10/opinion/democrats-election-obama-coalition.html",
        pub_date: "2017-11-10T10:45:25+0000"
      }
    ],
    topic: "",
    startDate: "",
    endDate: ""
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
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    //this.setState({
    //articles: []
    //});

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
                        Search{" "}
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
                    key={article.headline}
                    headline={article.headline}
                    snippet={article.snippet}
                    href={article.web_url}
                    pub_date={article.pub_date}
                  />
                );
              })}
            </SearchList>
          )}
        </Container>
        <Container className="savedContainer">
          <h4> Saved Articles: </h4>
          <SavedList>
            {this.state.savedArticles.map(article => {
              return (
                <SavedListItem
                  key={article.headline}
                  headline={article.headline}
                  snippet={article.snippet}
                  href={article.web_url}
                  pub_date={article.pub_date}
                />
              );
            })}
          </SavedList>
        </Container>
      </div>
    );
  }
}

export default Home;
