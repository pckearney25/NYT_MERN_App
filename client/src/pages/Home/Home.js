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
    articles: [
      {
        headline: "Remembering President Obama",
        snippet:
          "Peter Baker’s “Obama: The Call of History” is a tribute to a man and an office.",
        web_url:
          "https://www.nytimes.com/2017/12/01/books/review/peter-baker-obama-the-call-of-history.html",
        pub_date: "2017-12-01T17:03:19+0000"
      },
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
        web_url:
          "https://www.nytimes.com/2017/12/14/opinion/trump-lies-obama.html",
        pub_date: "2017-12-14T13:59:47+0000"
      },
      {
        headline: "How Can Trump Help Iran’s Protesters? Be Quiet.",
        snippet:
          "Public support from the United States government will do the demonstrators more harm than good.",
        web_url:
          "https://www.nytimes.com/2017/12/30/opinion/iran-protests-trump.html",
        pub_date: "2017-12-30T22:18:51+0000"
      }
    ],
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
      },
      {
        headline: "Writing Lines for Obama, Mixing Comedy and Hope",
        snippet:
          "In his memoir “Thanks, Obama,” the speechwriter David Litt recalls coming of age at the White House.",
        web_url:
          "https://www.nytimes.com/2017/09/22/books/review/thanks-obama-david-litt-memoir.html",
        pub_date: "2017-09-22T09:00:24+0000"
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
    const apiSearch =
      this.state.topic +
      "&begin_date=" +
      this.state.startDate +
      "&end_date=" +
      this.state.endDate;

    console.log(apiSearch);
    API.getArticles(apiSearch)
      .then(res => this.setState({ articles: res.data }))
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
        </Container>
        <Container className="searchContainer">
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
